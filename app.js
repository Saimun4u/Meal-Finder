const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_meal = document.getElementById('single-meals')




function searchMeal(e){

    //Clear single meal value

    single_meal.innerHTML = '';

    //Get value of item entered in search box

    const item = search.value;

    //Check for empty search item

    if(item.trim()){

        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.meals)
            resultHeading.innerHTML = `<h2>Showing search results for '${item}': </h2>`

            if (data.meals === null){
                resultHeading.innerHTML = `<p>There are no search results. Please try again</p>`
            }else{
                mealsEl.innerHTML = data.meals.map(meal => 
                    `<div class = "meal">
                        <img src="${meal.strMealThumb}" alt = "${meal.strMeal}"/>
                        <div class="meal-info" data-mealID = "${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div> 
                    </div>
                    `)
                    .join('')
            }
        });
        //Clear search value
        search.value = '';
    }else{
        alert('Please enter name of a meal to be searched');
    }

    e.preventDefault();
    
}

//Set event listeners

submit.addEventListener('submit', searchMeal);







