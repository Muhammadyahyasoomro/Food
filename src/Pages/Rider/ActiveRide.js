import React from "react";

export default function ActiveRide() {
  return <div>ActiveRide</div>;
}

//
import 'package:flutter/material.dart';
import 'package:fooddeliverysystem/Customer/custom_widget.dart';
import 'package:fooddeliverysystem/Rid_API/api.dart';
import 'package:fooddeliverysystem/Rider/r_my_rides.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class OrderDetailPage extends StatefulWidget {
  final int riderId;
  final int orderId;
  final int customerId;
  final int restaurantId;
  final String? status;

  const OrderDetailPage({
    super.key,
    required this.riderId,
    required this.orderId,
    required this.customerId,
    required this.restaurantId,
    required this.status,
  });

  @override
  _OrderDetailPageState createState() => _OrderDetailPageState();
}

class _OrderDetailPageState extends State<OrderDetailPage> {
  LatLng initialLatLng = const LatLng(33.6844, 73.0479);
  Set<Marker> markers = {};
  Set<Polygon> polygons = {};
  Set<Circle> circles = {};
  List<Map<String, dynamic>> zonePoints = [];

  GoogleMapController? _mapController;

  LatLng? restaurantLocation;
  LatLng? customerLocation;
  String pickupAddress = '';
  String dropoffAddress = '';
  double distance = 0.0;
  String acceptanceRateText = '';

  @override
  void initState() {
    super.initState();
    fetchZonePoints();
    fetchAcceptanceRate(); // Fetch acceptance rate when the page loads
    setState(() {
      drawPolygon();
    });
  }

  Future<void> fetchZonePoints() async {
    try {
      List<dynamic> zones = await APIHandler().getZoneByRestaurantId(widget.restaurantId);

      setState(() {
        zonePoints = List<Map<String, dynamic>>.from(zones);
      });

      print('Fetched zone points:');
      print(zonePoints);

      if (zonePoints.isNotEmpty) {
        // Calculate the center of the polygon
        double latSum = 0;
        double lngSum = 0;

        for (var point in zonePoints) {
          latSum += point['latitude'];
          lngSum += point['longitude'];
        }

        setState(() {
          initialLatLng = LatLng(latSum / zonePoints.length, lngSum / zonePoints.length);
        });

        setState(() {
          // Draw the polygon and circles
          drawPolygon();
        });

        fetchRestaurantLocation(); // Fetch restaurant location
        fetchCustomerLocation(); // Fetch customer location
      }
    } catch (e) {
      print('Error fetching zone points: $e');
    }
  }

  Future<void> fetchRestaurantLocation() async {
    try {
      Map<String, dynamic> location = await APIHandler().getLatlongOfRestaurant(widget.restaurantId);

      // Create custom marker
      BitmapDescriptor customMarker = await createCustomMarkerBitmap('Restaurant');

      // Add a marker for the restaurant location
      setState(() {
        restaurantLocation = LatLng(location['latitude'], location['longitude']);
        markers.add(
          Marker(
            markerId: const MarkerId('restaurant_marker'),
            position: restaurantLocation!,
            infoWindow: const InfoWindow(title: 'Restaurant Location'),
            icon: customMarker,
          ),
        );

        circles.add(
          Circle(
            circleId: const CircleId('restaurant_circle'),
            center: restaurantLocation!,
            radius: 1000,
            fillColor: Colors.red.withOpacity(0.2),
            strokeWidth: 2,
            strokeColor: Colors.red,
          ),
        );

        pickupAddress = location['address']; // Update pickup address
      });

      print('Restaurant Location:');
      print('Latitude: ${location['latitude']}');
      print('Longitude: ${location['longitude']}');
      print('Address: ${location['address']}');

      // Calculate distance after fetching both locations
      calculateDistance();
    } catch (e) {
      print('Error fetching restaurant location: $e');
    }
  }

  Future<void> fetchCustomerLocation() async {
    try {
      Map<String, dynamic> location = await APIHandler().getLatlongOfCustomer(widget.customerId);

      // Create custom marker
      BitmapDescriptor customMarker = await createCustomMarkerBitmap('Customer');

      // Add a marker for the customer location
      setState(() {
        customerLocation = LatLng(location['latitude'], location['longitude']);
        markers.add(
          Marker(
            markerId: const MarkerId('customer_marker'),
            position: customerLocation!,
            infoWindow: const InfoWindow(title: 'Customer Location'),
            icon: customMarker,
          ),
        );

        circles.add(
          Circle(
            circleId: const CircleId('customer_circle'),
            center: customerLocation!,
            radius: 1000,
            fillColor: Colors.green.withOpacity(0.2),
            strokeWidth: 2,
            strokeColor: Colors.green,
          ),
        );

        dropoffAddress = location['address']; // Update drop-off address
      });

      print('Customer Location:');
      print('Latitude: ${location['latitude']}');
      print('Longitude: ${location['longitude']}');
      print('Address: ${location['address']}');

      // Calculate distance after fetching both locations
      calculateDistance();
    } catch (e) {
      print('Error fetching customer location: $e');
    }
  }

  void calculateDistance() async {
    if (restaurantLocation != null && customerLocation != null) {
      try {
        distance = await APIHandler().getDistanceToCustomerToRestaurant(
          customerLocation!.latitude,
          customerLocation!.longitude,
          restaurantLocation!.latitude,
          restaurantLocation!.longitude,
          'K', // Change 'K' to your desired unit if needed
        );
        print('Distance from Restaurant to Customer: $distance km');
      } catch (e) {
        print('Error calculating distance: $e');
      }
    }
    setState(() {}); // Update the UI with new distance and addresses
  }

  Future<void> fetchAcceptanceRate() async {
    try {
      double rate = await APIHandler().acceptanceRate(widget.riderId);
      setState(() {
        acceptanceRateText = 'Your acceptance rate is ${rate.toStringAsFixed(1)}%';
      });
    } catch (e) {
      print('Error fetching acceptance rate: $e');
    }
  }

  void drawPolygon() {
    if (zonePoints.isNotEmpty) {
      List<LatLng> polygonLatLngs = zonePoints.map((point) {
        return LatLng(point['latitude'], point['longitude']);
      }).toList();

      setState(() {
        polygons.add(
          Polygon(
            polygonId: const PolygonId('zone_polygon'),
            points: polygonLatLngs,
            strokeWidth: 2,
            strokeColor: Colors.blue,
            fillColor: Colors.blue.withOpacity(0.3),
          ),
        );
      });

      // Update the camera position to the polygon's center
      _mapController?.animateCamera(
        CameraUpdate.newLatLngZoom(initialLatLng, 12),
      );
    }
  }

  Set<Polyline> _createPolylines() {
    Set<Polyline> polylines = {};

    if (restaurantLocation != null && customerLocation != null) {
      List<LatLng> polylineCoordinates = [
        restaurantLocation!,
        customerLocation!,
      ];

      PolylineId id = const PolylineId('poly');
      Polyline polyline = Polyline(
        polylineId: id,
        color: Colors.yellow,
        points: polylineCoordinates,
        width: 8,
        patterns: <PatternItem>[
          PatternItem.dot,
          PatternItem.gap(8), // Adjust gap size as needed
        ],
      );

      polylines.add(polyline);
    }

    return polylines;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        title: const Center(
          child: Text(
            'My Ride',
            style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(
              Icons.notifications,
              color: Colors.red,
            ),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Card(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20.0),
            ),
            elevation: 4,
            margin: const EdgeInsets.all(8.0),
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Center(
                child: Text(
                  acceptanceRateText, // Display acceptance rate here
                  style: const TextStyle(
                    fontSize: 16,
                  ),
                ),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(left: 8.0, right: 8.0, top: 3.0),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(20.0),
              child: Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.black, width: 1.0),
                  borderRadius: BorderRadius.circular(20.0),
                ),
                height: 350,
                child: GoogleMap(
                  initialCameraPosition: CameraPosition(
                    target: initialLatLng,
                    zoom: 12,
                  ),
                  onMapCreated: (GoogleMapController controller) {
                    _mapController = controller;
                  },
                  markers: markers,
                  polygons: polygons,
                  circles: circles,
                  polylines: _createPolylines(),
                ),
              ),
            ),
          ),

          // Pickup and Drop-off Information
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Text(
                      'Pickup',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Spacer(),
                    Text(
                      '${distance.toStringAsFixed(1)} km',
                      style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  pickupAddress,
                  style: const TextStyle(
                    fontSize: 14,
                  ),
                ),
                const SizedBox(height: 10),
                const Text(
                  'Drop-off',
                  style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 4),
                Text(
                  dropoffAddress,
                  style: const TextStyle(
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
          const Padding(
            padding: EdgeInsets.all(8.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Text(
                    'UPDATE STATUS',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 10,),
          Column(
            children: [
              Center(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      color: Colors.green,
                      width: 50,
                      height: 30,
                      child: Center(
                        child: Text(
                          '${widget.status}',
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                      ),
                    ),
                    const SizedBox(width: 50),
                    ElevatedButton(
                      onPressed: () async {
                        try {
                          String result = await APIHandler().orderIsDelivered(widget.orderId);
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text(result),
                              backgroundColor: Colors.green,
                            ),
                          );
                          // Navigate to MyRidesPage after a delay to show the Snackbar
                          await Future.delayed(const Duration(seconds: 1));
                          Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(builder: (context) => MyRidesPage(rId: widget.riderId,)),
                          );
                        } catch (e) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text('Error: $e'),
                              backgroundColor: Colors.red,
                            ),
                          );
                        }
                      },
                      style: ButtonStyle(
                        shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                          RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30.0),
                          ),
                        ),
                        fixedSize: MaterialStateProperty.all(const Size(150, 50)),
                        backgroundColor: MaterialStateProperty.all(Colors.red),
                      ),
                      child: const Text("Delivered", style: TextStyle(color: Colors.white)),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 20,),
        ],
      ),
    );
  }
}


 read that flutter coe and  convert to react js 
 and update  component above   ActiveRides

 create all code in one file and use 
 import {
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} 

library 
for google map 
