import data from "./data.js";
const searchInput = document.getElementById("search");
const resultsList = document.getElementById("search-results");

searchInput.addEventListener("input", () => {


  const searchTerm = searchInput.value.toLowerCase();
  const filteredData = data.filter(item => {
    return Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm)
    );
  });


  const limitedResults = filteredData.slice(0, 5);

  resultsList.innerHTML = ""; // Clear previous results

    if(searchInput.value != ""){
    resultsList.style.display = 'block';
  }else if(searchInput.value == ""){
    resultsList.style.display = 'none';
  }

  if (limitedResults.length > 0) {
    resultsList.style.display = 'block';
    limitedResults.forEach(item => {
      const listItem = document.createElement('a');
      listItem.setAttribute("href", "/product");
      listItem.textContent = item.product_name;
      resultsList.appendChild(listItem);
    });
  } else {
    resultsList.style.display = 'none';
  }
});
  
    // // Display filtered results
    // filteredData.forEach(item => {
    //   const resultElement = document.createElement("div");
    //   resultElement.textContent = `${item.product_name}`;
    //   resultsContainer.appendChild(resultElement);
    // });
  