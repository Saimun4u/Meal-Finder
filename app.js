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

//Fetch meal by ID function
    function getMealById(mealID){
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res=> res.json())
        .then(data => {
            const meal = data.meals[0]

            addMealToDOM(meal);
        });
    }

//Fetch random meal from API





//Add meal to DOM

function addMealToDOM(meal){
    const ingredients = [];

    for (let i=0; i <= 20; i++){
        if (meal[`strIngredient${i}`]){
                ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
          break;
        }    
    }

    single_meal.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt=${meal.strMeal}}/>
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ``}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ``}
            </div>
            <div class="main"
                <p>${meal.strInstructions}</p>
                <h2>Instructions</h2>
                <ul>
                    ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

//Set event listeners

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);

mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');
        }else{
            return false;
        }
    })

    if (mealInfo){
        const mealID = mealInfo.getAttribute('data-mealid')
        console.log(mealID);
        getMealById(mealID);
    }

})







