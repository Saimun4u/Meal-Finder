const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    meals = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_meal = document.getElementById('single-meals')




function searchMeal(e){

    console.log(search.value);

    e.preventDefault();
}


//Set event listeners

submit.addEventListener('submit', searchMeal);







