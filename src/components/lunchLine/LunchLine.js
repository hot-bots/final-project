import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Form from "./recipeForm";
import NavBar from "../layouts/navBar/navbar"
import { getRecipes } from "../../store/lunchLine.js";
import API from '../../constants/url.js';
import '../../App.css';

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { orange } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Container from '@material-ui/core/Container';
import axios from "axios";
// import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]:{
            maxWidth: 345,    
            },
            [theme.breakpoints.down('md')]:{
                maxWidth: 500,
            },
            [theme.breakpoints.down('lg')]:{
                maxWidth: 700,
            }, 
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: orange[500],
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1000,
    },
}));

const LunchLine = ({ getRecipes, recipes, currentUser }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const [cookbook, setCookbook] = useState(JSON.parse(currentUser.profile.cookbook) || [])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    useEffect(() => {
        getRecipes()
    }, [getRecipes])

    const likeHandler = async (recipe) => {

        if (cookbook === null) {
            let newCookbook = []
            newCookbook.push(recipe);

        } else {

            for (let i = 0; i < cookbook.length; i++) {
                if (cookbook[i].id === recipe.id) {
                    return;
                };
            }

            let newBook = cookbook.push(recipe);
            setCookbook(newBook);

            let url = API.BASE + API.COOKBOOK + currentUser.profile.id

            const response = await axios.put(url, { data: cookbook })

        }

    }

    return (
        <>
            <NavBar />
            <Container maxWidth="sm" className="container">
                <div className={classes.root}>
                    <Form />

                    <h2>My lunch line</h2>
                    <h3>USER:{currentUser.id} is logged in </h3>
                    <div>
                        {recipes.map((recipe) => (

                            <Card key={Math.random()}>

                                <CardHeader
                                    avatar={
                                        <Avatar
                                            aria-label="recipe"
                                            className={classes.avatar}
                                        >
                                            R
                                        </Avatar>
                                    }
                                    title={Object.values(recipe.recipeName)}
                                />



                                <CardMedia
                                    className={classes.media}
                                    // image={`https://source.unsplash.com/random?${recipe.recipeName}`}
                                    image={recipe.thumbnail}
                                    title={recipe.recipeName}
                                />
                                <Typography variant="subtitle1">
                                        <h3>Source:{" "}</h3>
                                        {(recipe.author)}
                                    </Typography>
                                <CardContent>
                                 
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton onClick={() => { likeHandler(recipe) }} aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <Collapse
                                    in={expanded}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                 <CardContent>
                                       <Typography variant="subtitle1">
                                        <h3>Time:</h3>{" "}
                                        {(recipe.prepTime)}{" "}
                                        minutes
                                    </Typography>
                                   
                                        <Typography paragraph>
                                            <h3>Ingredients:</h3>
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {recipe.ingredients}
                                            {/* {` ${Object.values(
                                            recipe.ingredients
                                        )} `} */}
                                        </Typography>
                                        <Typography paragraph>
                                            <h3>Directions:</h3>
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                        >
                                            {`${recipe.directions} `}
                                        </Typography>
                                    </CardContent>
                                </Collapse>

                            </Card>

                        ))}

                    </div>


                </div>
            </Container>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        recipes: state.lunchLineReducer.recipes,
        currentUser: state.userReducer.user,
    };
};

const mapDispatchToProps = { getRecipes };
export default connect(mapStateToProps, mapDispatchToProps)(LunchLine);
