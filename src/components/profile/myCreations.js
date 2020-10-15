import React, { useEffect } from 'react';
import { connect } from "react-redux";


function MyCreations({ creations }) {



    return (
        <React.Fragment>
            <h2>My Creations</h2>
            <br />
            {creations.map((recipe) => (
                <p>{recipe.recipeName}</p>
            ))}
        </React.Fragment>
    );

}

const mapStateToProps = (state) => {

    return {

        creations: state.userReducer.user.creations,
        userID: state.userReducer.user.id

    };

};

// const mapDispatchToProps = { getRecipes };


export default connect(mapStateToProps)(MyCreations);
