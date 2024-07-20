import React, { useState } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTheme } from '../../../context/ThemeContext';
import { useCategory } from '../../../context/CategoryContext';

export default function NewListingCategory() {
  const { next, CheckNext } = useTheme();
  const { setCategory, setSubcategory } = useCategory();

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#D31212",
      border: "none",
      borderRadius: "12px",
      padding: "10px",
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "red",
      backgroundColor: state.isSelected ? "pink" : state.isFocused ? "pink" : "white",
      borderBottom: "2px dashed red",
      padding: "12px",
      "&:hover": {
        backgroundColor: "pink",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "white",
    }),
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const categories = [
    { 
      value: "main_courses", 
      label: "Main Courses", 
      subcategories: [
        { value: "biryani", label: "Biryani" },
        { value: "karahi", label: "Karahi" },
        { value: "handi", label: "Handi" },
        { value: "nihari", label: "Nihari" },
        { value: "pulao", label: "Pulao" },
        { value: "haleem", label: "Haleem" },
        { value: "keema", label: "Keema" },
        { value: "saag", label: "Saag" },
        { value: "korma", label: "Korma" },
        { value: "achar_gosht", label: "Achar Gosht" },
        { value: "paye", label: "Paye" }
      ]
    },
    { 
      value: "bbq", 
      label: "Barbecue (BBQ)", 
      subcategories: [
        { value: "seekh_kebab", label: "Seekh Kebab" },
        { value: "shami_kebab", label: "Shami Kebab" },
        { value: "chapli_kebab", label: "Chapli Kebab" },
        { value: "bihari_kebab", label: "Bihari Kebab" },
        { value: "tandoori_chicken", label: "Tandoori Chicken" },
        { value: "malai_boti", label: "Malai Boti" },
        { value: "reshmi_kebab", label: "Reshmi Kebab" },
        { value: "grilled_fish", label: "Grilled Fish" }
      ]
    },
    { 
      value: "bread_rice", 
      label: "Bread & Rice", 
      subcategories: [
        { value: "naan", label: "Naan" },
        { value: "roti", label: "Roti" },
        { value: "paratha", label: "Paratha" },
        { value: "chapati", label: "Chapati" },
        { value: "kulcha", label: "Kulcha" },
        { value: "puri", label: "Puri" },
        { value: "saffron_rice", label: "Saffron Rice" }
      ]
    },
    { 
      value: "street_food", 
      label: "Street Food", 
      subcategories: [
        { value: "chaat", label: "Chaat" },
        { value: "samosa", label: "Samosa" },
        { value: "pakora", label: "Pakora" },
        { value: "golgappa", label: "Golgappa/Pani Puri" },
        { value: "dahi_bhalla", label: "Dahi Bhalla" },
        { value: "bun_kebab", label: "Bun Kebab" },
        { value: "rolls", label: "Rolls (Chicken/Mutton/Beef)" }
      ]
    },
    { 
      value: "vegetarian", 
      label: "Vegetarian Dishes", 
      subcategories: [
        { value: "aloo_gobi", label: "Aloo Gobi" },
        { value: "chana_masala", label: "Chana Masala" },
        { value: "bhindi_masala", label: "Bhindi Masala" },
        { value: "baingan_bharta", label: "Baingan Bharta" },
        { value: "dal_tadka", label: "Dal Tadka" },
        { value: "paneer_dishes", label: "Paneer Dishes" }
      ]
    },
    { 
      value: "seafood", 
      label: "Seafood", 
      subcategories: [
        { value: "fish_curry", label: "Fish Curry" },
        { value: "prawn_curry", label: "Prawn Curry" },
        { value: "fried_fish", label: "Fried Fish" },
        { value: "grilled_fish", label: "Grilled Fish" },
        { value: "fish_tikka", label: "Fish Tikka" },
        { value: "seafood_biryani", label: "Seafood Biryani" }
      ]
    },
    { 
      value: "snacks_appetizers", 
      label: "Snacks & Appetizers", 
      subcategories: [
        { value: "spring_rolls", label: "Spring Rolls" },
        { value: "mini_samosas", label: "Mini Samosas" },
        { value: "chicken_wings", label: "Chicken Wings" },
        { value: "shish_taouk", label: "Shish Taouk" },
        { value: "cheese_balls", label: "Cheese Balls" },
        { value: "stuffed_peppers", label: "Stuffed Peppers" }
      ]
    },
    { 
      value: "desserts_sweets", 
      label: "Desserts & Sweets", 
      subcategories: [
        { value: "gulab_jamun", label: "Gulab Jamun" },
        { value: "jalebi", label: "Jalebi" },
        { value: "kheer", label: "Kheer" },
        { value: "barfi", label: "Barfi" },
        { value: "ladoo", label: "Ladoo" },
        { value: "halwa", label: "Halwa (Gajar, Suji, etc.)" },
        { value: "ras_malai", label: "Ras Malai" },
        { value: "falooda", label: "Falooda" },
        { value: "sheer_khurma", label: "Sheer Khurma" }
      ]
    },
    { 
      value: "beverages", 
      label: "Beverages", 
      subcategories: [
        { value: "lassi", label: "Lassi (Sweet/Salted)" },
        { value: "chai", label: "Chai (Tea)" },
        { value: "green_tea", label: "Green Tea (Kahwa)" },
        { value: "sherbet", label: "Sherbet" },
        { value: "rooh_afza", label: "Rooh Afza" },
        { value: "falooda_drink", label: "Falooda Drink" }
      ]
    },
    { 
      value: "salads_sides", 
      label: "Salads & Sides", 
      subcategories: [
        { value: "raita", label: "Raita" },
        { value: "kachumber_salad", label: "Kachumber Salad" },
        { value: "achar", label: "Achar (Pickles)" },
        { value: "chutney", label: "Chutney (Mint, Tamarind, etc.)" },
        { value: "fresh_salad", label: "Fresh Salad" }
      ]
    },
    { 
      value: "soups_stews", 
      label: "Soups & Stews", 
      subcategories: [
        { value: "yakhni", label: "Yakhni" },
        { value: "lentil_soup", label: "Lentil Soup" },
        { value: "chicken_corn_soup", label: "Chicken Corn Soup" },
        { value: "hot_and_sour_soup", label: "Hot and Sour Soup" }
      ]
    },
    { 
      value: "regional_specialties", 
      label: "Regional Specialties", 
      subcategories: [
        { 
          value: "sindhi_cuisine", 
          label: "Sindhi Cuisine", 
          subcategories: [
            { value: "sindhi_biryani", label: "Sindhi Biryani" },
            { value: "sindhi_curry", label: "Sindhi Curry" },
            { value: "sindhi_saag", label: "Saag" }
          ]
        },
        { 
          value: "punjabi_cuisine", 
          label: "Punjabi Cuisine", 
          subcategories: [
            { value: "sarson_ka_saag", label: "Sarson Ka Saag" },
            { value: "makki_ki_roti", label: "Makki Ki Roti" },
            { value: "butter_chicken", label: "Butter Chicken" }
          ]
        },
        { 
          value: "balochi_cuisine", 
          label: "Balochi Cuisine", 
          subcategories: [
            { value: "sajji", label: "Sajji" },
            { value: "kaak", label: "Kaak" }
          ]
        },
        { 
          value: "pashtun_cuisine", 
          label: "Pashtun Cuisine", 
          subcategories: [
            { value: "chapli_kebab", label: "Chapli Kebab" },
            { value: "kabuli_pulao", label: "Kabuli Pulao" }
          ]
        },
        { 
          value: "kashmiri_cuisine", 
          label: "Kashmiri Cuisine", 
          subcategories: [
            { value: "rogan_josh", label: "Rogan Josh" },
            { value: "gushtaba", label: "Gushtaba" }
          ]
        }
      ]
    }
  ];

  const getSubcategories = (category) => {
    if (category && category.subcategories) {
      return category.subcategories.map(sub => ({
        value: sub.value,
        label: sub.label,
        subcategories: sub.subcategories || [],
      }));
    }
    return [];
  };

  return (
    <div className="myNewDesign">
      <div className="Category Row d-flex border border-0 rounded p-3">
        <div className="col mt-3">
          <p>Select Category</p>
        </div>
        <div style={{ width: "200px" }} className='col'>
          <Select
            styles={customStyles}
            options={categories}
            onChange={(category) => {
              setSelectedCategory(category);
              setSelectedSubcategory(null);  // Reset subcategory selection
            }}
            placeholder="Select category"
          />
        </div>
      </div>
      {selectedCategory && getSubcategories(selectedCategory).length > 0 && (
        <div className="Subcategory d-flex row border border-0 rounded p-3">
          <div className="col mt-3">
            <p>Select Subcategory</p>
          </div>
          <div style={{ width: "200px" }} className='col'>
            <Select
              styles={customStyles}
              options={getSubcategories(selectedCategory)}
              onChange={(subcategory) => {
                setSelectedSubcategory(subcategory);
              }}
              placeholder="Select subcategory"
            />
          </div>
          <Button 
            variant="outline-danger"
            onClick={() => {
              CheckNext();
              setCategory(selectedCategory);
              setSubcategory(selectedSubcategory);
            }}
            disabled={!selectedSubcategory}
            className="mt-3 rounded-pill border border-2 border-danger fs-1"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
