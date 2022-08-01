import { React, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

const Cuisine = () => {
  const params = useParams();
  const [cuisine, setCuisine] = useState([]);
  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&name=${name}`
    );
    const recipies = await data.json();
    setCuisine(recipies.results);
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);
  return <Grid>
    {cuisine.map((item)=>{
      return(
        <Card key={item.id}>
          <img src={item.image} alt=''/>
          <h4>{item.title}</h4>
        </Card>
      )
    })}
  </Grid >;
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-gap: 3rem;
`;
const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;