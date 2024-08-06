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
        { value: "paye", label: "Paye" },
        { value: "pizza", label: "Pizza" },
        { value: "burger", label: "Burger" },
        { value: "lasagna", label: "Lasagna" },
        { value: "ramen", label: "Ramen" }
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
        { value: "grilled_fish", label: "Grilled Fish" },
        { value: "steak", label: "Steak" },
        { value: "ribs", label: "Ribs" },
        { value: "pulled_pork", label: "Pulled Pork" },
        { value: "satay", label: "Satay" }
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
        { value: "saffron_rice", label: "Saffron Rice" },
        { value: "baguette", label: "Baguette" },
        { value: "sourdough", label: "Sourdough" },
        { value: "ciabatta", label: "Ciabatta" },
        { value: "focaccia", label: "Focaccia" },
        { value: "sushi_rice", label: "Sushi Rice" }
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
        { value: "rolls", label: "Rolls (Chicken/Mutton/Beef)" },
        { value: "tacos", label: "Tacos" },
        { value: "gyros", label: "Gyros" },
        { value: "hot_dog", label: "Hot Dog" },
        { value: "poutine", label: "Poutine" },
        { value: "empanadas", label: "Empanadas" }
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
        { value: "paneer_dishes", label: "Paneer Dishes" },
        { value: "ratatouille", label: "Ratatouille" },
        { value: "falafel", label: "Falafel" },
        { value: "hummus", label: "Hummus" },
        { value: "gazpacho", label: "Gazpacho" },
        { value: "vegetable_curry", label: "Vegetable Curry" }
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
        { value: "seafood_biryani", label: "Seafood Biryani" },
        { value: "lobster_thermidor", label: "Lobster Thermidor" },
        { value: "shrimp_scampi", label: "Shrimp Scampi" },
        { value: "clam_chowder", label: "Clam Chowder" },
        { value: "ceviche", label: "Ceviche" },
        { value: "sushi", label: "Sushi" }
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
        { value: "stuffed_peppers", label: "Stuffed Peppers" },
        { value: "bruschetta", label: "Bruschetta" },
        { value: "mozzarella_sticks", label: "Mozzarella Sticks" },
        { value: "nachos", label: "Nachos" },
        { value: "deviled_eggs", label: "Deviled Eggs" },
        { value: "dim_sum", label: "Dim Sum" }
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
        { value: "sheer_khurma", label: "Sheer Khurma" },
        { value: "tiramisu", label: "Tiramisu" },
        { value: "cheesecake", label: "Cheesecake" },
        { value: "macarons", label: "Macarons" },
        { value: "brownies", label: "Brownies" },
        { value: "pavlova", label: "Pavlova" }
      ]
    },
    { 
      value: "beverages", 
      label: "Beverages", 
      subcategories: [
        { value: "lassi", label: "Lassi (Sweet/Salted)" },
        { value: "chai", label: "Chai (Tea)" },
        { value: "green_tea", label: "Green Tea" },
        { value: "qehwa", label: "Qehwa" },
        { value: "falooda", label: "Falooda" },
        { value: "milkshakes", label: "Milkshakes" },
        { value: "smoothies", label: "Smoothies" },
        { value: "lemonade", label: "Lemonade" },
        { value: "sherbet", label: "Sherbet" },
        { value: "coffee", label: "Coffee" },
        { value: "mojito", label: "Mojito" },
        { value: "soda", label: "Soda" },
        { value: "cocktails", label: "Cocktails" }
      ]
    },
    { 
      value: "cheese_products", 
      label: "Cheese Products", 
      subcategories: [
        { value: "cheese_pizza", label: "Cheese Pizza" },
        { value: "mac_and_cheese", label: "Mac and Cheese" },
        { value: "cheese_burger", label: "Cheese Burger" },
        { value: "cheese_fondue", label: "Cheese Fondue" },
        { value: "cheese_sandwich", label: "Cheese Sandwich" },
        { value: "cheese_fries", label: "Cheese Fries" },
        { value: "cheese_stuffed_crust_pizza", label: "Cheese Stuffed Crust Pizza" },
        { value: "cheese_omelette", label: "Cheese Omelette" },
        { value: "quesadilla", label: "Quesadilla" },
        { value: "cheese_enchiladas", label: "Cheese Enchiladas" },
        { value: "grilled_cheese_sandwich", label: "Grilled Cheese Sandwich" },
        { value: "cheese_lasagna", label: "Cheese Lasagna" },
        { value: "cheese_tacos", label: "Cheese Tacos" },
        { value: "mozzarella_sticks", label: "Mozzarella Sticks" },
        { value: "cheese_souffle", label: "Cheese Soufflé" }
      ]
    },
    { 
      value: "peshawari_cuisine", 
      label: "Peshawari Cuisine", 
      subcategories: [
        { value: "chapli_kebab", label: "Chapli Kebab" },
        { value: "peshawari_namak_mandi_karahi", label: "Peshawari Namak Mandi Karahi" },
        { value: "kabuli_pulao", label: "Kabuli Pulao" },
        { value: "peshawari_naan", label: "Peshawari Naan" },
        { value: "mutton_karahi", label: "Mutton Karahi" },
        { value: "afghani_pulao", label: "Afghani Pulao" },
        { value: "peshawari_tikka", label: "Peshawari Tikka" },
        { value: "peshawari_chapli_kebab", label: "Peshawari Chapli Kebab" },
        { value: "afghani_boti", label: "Afghani Boti" },
        { value: "peshawari_samosa", label: "Peshawari Samosa" },
        { value: "peshawari_chicken_karahi", label: "Peshawari Chicken Karahi" },
        { value: "qehwa", label: "Qehwa" },
        { value: "peshawari_lamb_pulav", label: "Peshawari Lamb Pulav" },
        { value: "kebab_karahi", label: "Kebab Karahi" }
      ]
    },
    { 
      value: "sindhi_cuisine", 
      label: "Sindhi Cuisine", 
      subcategories: [
        { value: "sindhi_biryani", label: "Sindhi Biryani" },
        { value: "sindhi_karhi", label: "Sindhi Karhi" },
        { value: "sai_bhaji", label: "Sai Bhaji" },
        { value: "sindhi_kadhi", label: "Sindhi Kadhi" },
        { value: "dal_pakwan", label: "Dal Pakwan" },
        { value: "bhugal_ghost", label: "Bhugal Ghost" },
        { value: "sindhi_pulao", label: "Sindhi Pulao" },
        { value: "sindhi_fish", label: "Sindhi Fish" },
        { value: "koki", label: "Koki" },
        { value: "seviyan", label: "Seviyan" },
        { value: "mitho_lolo", label: "Mitho Lolo" },
        { value: "sindhi_sai_bhaji", label: "Sindhi Sai Bhaji" },
        { value: "sindhi_dal", label: "Sindhi Dal" },
        { value: "sindhi_alu_tikki", label: "Sindhi Alu Tikki" },
        { value: "taryal_patata", label: "Taryal Patata" }
      ]
    },{ 
      value: "kpk_cuisine", 
      label: "KPK Cuisine", 
      subcategories: [
        { value: "chapli_kebab", label: "Chapli Kebab" },
        { value: "kabuli_pulao", label: "Kabuli Pulao" },
        { value: "lamb_karahi", label: "Lamb Karahi" },
        { value: "peshawari_namak_mandi_karahi", label: "Peshawari Namak Mandi Karahi" },
        { value: "afghani_boti", label: "Afghani Boti" },
        { value: "tikka_karahi", label: "Tikka Karahi" },
        { value: "namkeen_tikka", label: "Namkeen Tikka" },
        { value: "peshawari_tikka", label: "Peshawari Tikka" },
        { value: "chapli_burger", label: "Chapli Burger" },
        { value: "qehwa", label: "Qehwa" }
      ]
    },
    { 
      value: "punjabi_cuisine", 
      label: "Punjabi Cuisine", 
      subcategories: [
        { value: "sarson_ka_saag", label: "Sarson Ka Saag" },
        { value: "makki_ki_roti", label: "Makki Ki Roti" },
        { value: "butter_chicken", label: "Butter Chicken" },
        { value: "punjabi_kadhi", label: "Punjabi Kadhi" },
        { value: "chole_bhature", label: "Chole Bhature" },
        { value: "amritsari_fish", label: "Amritsari Fish" },
        { value: "paneer_tikka", label: "Paneer Tikka" },
        { value: "lassi", label: "Lassi" },
        { value: "aloo_paratha", label: "Aloo Paratha" },
        { value: "chicken_tikka", label: "Chicken Tikka" },
        { value: "methi_chicken", label: "Methi Chicken" },
        { value: "punjabi_samosa", label: "Punjabi Samosa" },
        { value: "punjabi_rajma", label: "Punjabi Rajma" },
        { value: "dal_makhani", label: "Dal Makhani" },
        { value: "punjabi_pulao", label: "Punjabi Pulao" }
      ]
    },
    { 
      value: "balochi_cuisine", 
      label: "Balochi Cuisine", 
      subcategories: [
        { value: "sajji", label: "Sajji" },
        { value: "kaak", label: "Kaak" },
        { value: "balochi_pulao", label: "Balochi Pulao" },
        { value: "balochi_karahi", label: "Balochi Karahi" },
        { value: "balochi_korma", label: "Balochi Korma" },
        { value: "landi", label: "Landi" },
        { value: "balochi_tikka", label: "Balochi Tikka" },
        { value: "shahi_pulao", label: "Shahi Pulao" }
      ]
    },
    { 
      value: "siraiki_cuisine", 
      label: "Siraiki Cuisine", 
      subcategories: [
        { value: "sohan_halwa", label: "Sohan Halwa" },
        { value: "siraiki_biryani", label: "Siraiki Biryani" },
        { value: "siraiki_karhi", label: "Siraiki Karhi" },
        { value: "saag", label: "Saag" },
        { value: "makai_ki_roti", label: "Makai Ki Roti" },
        { value: "bhuge_chawal", label: "Bhuge Chawal" },
        { value: "siraiki_daal", label: "Siraiki Daal" },
        { value: "bhindi_ghosht", label: "Bhindi Ghosht" }
      ]
    },
    { 
      value: "urdu_speaking_cuisine", 
      label: "Urdu Speaking Cuisine", 
      subcategories: [
        { value: "nihari", label: "Nihari" },
        { value: "haleem", label: "Haleem" },
        { value: "biryani", label: "Biryani" },
        { value: "qeema", label: "Qeema" },
        { value: "kofta", label: "Kofta" },
        { value: "seekh_kebab", label: "Seekh Kebab" },
        { value: "karhai", label: "Karhai" },
        { value: "kat_a_kat", label: "Kat-a-Kat" },
        { value: "paya", label: "Paya" },
        { value: "sindhi_biryani", label: "Sindhi Biryani" },
        { value: "sheer_khurma", label: "Sheer Khurma" },
        { value: "rabri", label: "Rabri" }
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
