import React from "react";

// Views
import ProductCategories from "../../modules/views/ProductCategories";
import ProductSmokingHero from "../../modules/views/ProductSmokingHero";
import AppFooter from "../../modules/views/AppFooter";
import ProductHero from "../../modules/views/ProductHero";
import ProductValues from "../../modules/views/ProductValues";
import ProductHowItWorks from "../../modules/views/ProductHowItWorks";
import ProductCTA from "../../modules/views/ProductCTA";

const Index = () => {
  return (
    <React.Fragment>
      <ProductHero />
      <ProductValues />
      <ProductCategories />
      <ProductHowItWorks />
      <ProductCTA />
      <ProductSmokingHero />
      <AppFooter />
    </React.Fragment>
  );
};

export default Index;
