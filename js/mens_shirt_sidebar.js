import data from "./data.js";

$(document).ready(function () {
  $(".brand-menu li").on("click", function () {
    // $(".brand-menu li.active").removeClass("active");

    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(".brand-menu li.active").removeClass("active");
      $(this).addClass("active");
    }

    var listItem = $(this).attr("data-id");

    $(".clothing-container .category-row.active").fadeOut(500, showNext);

    function showNext() {
      $(this).removeClass("active");
      $("#" + listItem).fadeIn(600, function () {
        $(this).addClass("active");
      });
    }
  });

  $(".color-menu li").on("click", function () {
    // $(".color-menu li.active").removeClass("active");
    // $(this).toggleClass("active");

    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(".color-menu li.active").removeClass("active");
      $(this).addClass("active");
    }

    var listItem = $(this).attr("data-id");
    // console.log(listItem);

    $(".clothing-container .category-row.active").fadeOut(500, showNext);

    function showNext() {
      $(this).removeClass("active");
      $("#" + listItem).fadeIn(600, function () {
        $(this).addClass("active");
      });
    }
  });

  $(".size-menu li").on("click", function () {
    // $(".size-menu li.active").removeClass("active");
    // $(this).toggleClass("active");

    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    } else {
      $(".size-menu li.active").removeClass("active");
      $(this).addClass("active");
    }

    var listItem = $(this).attr("data-id");
    // console.log(listItem);
    $(".clothing-container .category-row.active").fadeOut(500, showNext);

    function showNext() {
      $(this).removeClass("active");
      $("#" + listItem).fadeIn(600, function () {
        $(this).addClass("active");
      });
    }
  });
});

const brandMenu = document.querySelector(".brand-menu");
const colorMenu = document.querySelector(".color-menu");
const sizeMenu = document.querySelector(".size-menu");
const paginationELement = document.querySelector(".pagination");
const list = document.querySelector(".list");
const itemsPerPage = 6; // Number of items to display per page
let currentPage = 1; // Current page number
let filteredData;

function filterByCategory(items, category) {
  return items.filter((item) => item.category === category);
}

function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

function removeDuplicatesByKey(arr, key) {
  const seen = new Set();
  return arr.filter((item) => {
    const value = item[key];
    if (!seen.has(value)) {
      seen.add(value);
      return true;
    }
    return false;
  });
}

// Filter settings
const filterState = {
  brand: "",
  color: "",
  size: [],
  minPrice: 0,
  maxPrice: 1000,
};

let menShirtsFilter = filterByCategory(data, "Men T-Shirts");

const uniqueBrandData = removeDuplicatesByKey(menShirtsFilter, "brand");
const uniqueColorData = removeDuplicatesByKey(menShirtsFilter, "color");
const uniqueSizeData = removeDuplicatesByKey(menShirtsFilter, "size");

// SIZE
const arr = [];
uniqueSizeData.forEach((item) => {
  item.size.forEach((i) => {
    arr.push(i);
  });
});

let sizeArr = removeDuplicates(arr);

function brandFilter() {
  uniqueBrandData.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.id = item.brand;
    listItem.textContent = item.brand;
    brandMenu.appendChild(listItem);
  });
}

function colorFilter() {
  uniqueColorData.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.id = item.color;
    listItem.textContent = item.color;
    colorMenu.appendChild(listItem);
  });
}

function sizeFilter(sizeArr) {
  sizeArr.forEach((size) => {
    const listItem = document.createElement("li");
    listItem.id = size;
    listItem.textContent = size;
    sizeMenu.appendChild(listItem);
  });
}

function paginate(items, page, perPage) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return items.slice(startIndex, endIndex);
}

function renderItems(items, page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = items.slice(startIndex, endIndex);
  // console.log(startIndex);
  // console.log(endIndex);
  // console.log(itemsToDisplay);

  const container = document.querySelector(".list");
  container.innerHTML = ""; // Clear existing items

  itemsToDisplay.forEach((item) => {
    // console.log(item);

    let itemElement = document.createElement("div");
    itemElement.classList.add(
      "col-lg-4",
      "col-md-4",
      "col-sm-12",
      "product",
      item.color,
      item.brand
    );
    itemElement.innerHTML = `
        <div class="card mb-5">
          <a class="text-dark" href="#">
            <img
              src="${item.product_img}"
              class="img-fluid w-100 product-img d-block"
              alt="product-img"
            />
          </a>
          <div class="card-section text-center">
            <a class="text-dark" href="#">${item.product_name}</a>
            <p class="product-price">$${item.product_price}</p>
            <span class="btn btn-dark d-block add-to-cart">Add To Cart</span>
          </div>
    </div>`;
    // console.log(itemElement);

    container.appendChild(itemElement);
  });
}

function renderPagination(totalPages) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = ""; // Clear previous buttons

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.addEventListener("click", () => {
      preloader.style.display = "flex"; // Show preloader
      content.style.display = "none"; // Hide content initially

      currentPage = i;

      renderItems(filteredData, currentPage);
      // Simulate an asynchronous operation
      setTimeout(() => {
        preloader.style.display = "none"; // Hide preloader
        content.style.display = "block"; // Show content
      }, 2000); // Replace with actual asynchronous task
    });
    paginationContainer.appendChild(button);
  }
}

brandFilter();
colorFilter();
sizeFilter(sizeArr);
// console.log(brandMenu);
applyFilters();

// Function to apply filters
function applyFilters() {
  // Update filter state based on input values
  let brandListItem = document.querySelectorAll(".brand-menu li");
  let colorListItem = document.querySelectorAll(".color-menu li");
  let sizeListItem = document.querySelectorAll(".size-menu li");

  brandListItem.forEach((item) => {
    item.addEventListener("click", function (e) {
      if (filterState.brand === e.target.id) {
        filterState.brand = "";
        if (
          filterState.brand === "" &&
          filterState.color === "" &&
          filterState.size.length === 0
        ) {
          filteredData = filterByCategory(data, "Men T-Shirts");
          const paginatedItems = paginate(
            filteredData,
            currentPage,
            itemsPerPage
          );

          renderItems(filteredData, currentPage);
          renderPagination(Math.ceil(filteredData.length / itemsPerPage));
        }
      } else if (filterState.brand === "") {
        filterState.brand = e.target.id;
        filterAndDisplayData();
        console.log(filterState);
      } else if (filterState.brand != e.target.id) {
        filterState.brand = e.target.id;
        filterAndDisplayData();
      }
    });
  });

  colorListItem.forEach((item) => {
    item.addEventListener("click", function (e) {
      if (filterState.color === e.target.id) {
        filterState.color = "";
        if (
          filterState.brand === "" &&
          filterState.color === "" &&
          filterState.size.length === 0
        ) {
          filteredData = filterByCategory(data, "Women Dresses");
          const paginatedItems = paginate(
            filteredData,
            currentPage,
            itemsPerPage
          );
          renderItems(filteredData, currentPage);
          renderPagination(Math.ceil(filteredData.length / itemsPerPage));
        }
      } else if (filterState.color === "") {
        filterState.color = e.target.id;
        filterAndDisplayData();
      } else if (filterState.color != e.target.id) {
        filterState.color = e.target.id;
        filterAndDisplayData();
      }
    });
  });

  sizeListItem.forEach((item) => {
    item.addEventListener("click", function (e) {
      let arr = [];
      arr.push(e.target.id);
      const foundElement = filterState.size.some((element) =>
        arr.includes(element)
      );

      if (foundElement) {
        filterState.size = [];
        if (
          filterState.brand === "" &&
          filterState.color === "" &&
          filterState.size.length === 0
        ) {
          filteredData = filterByCategory(data, "Men T-Shirts");
          const paginatedItems = paginate(
            filteredData,
            currentPage,
            itemsPerPage
          );
          renderItems(filteredData, currentPage);
          renderPagination(Math.ceil(filteredData.length / itemsPerPage));
        }
      } else if (filterState.size.length === 0) {
        filterState.size.push(e.target.id);
        filterState.size = removeDuplicates(filterState.size);
        filterAndDisplayData();
      } else if (!foundElement) {
        filterState.size = [];
        filterState.size.push(e.target.id);
        filterState.size = removeDuplicates(filterState.size);
        filterAndDisplayData();
      }
      // filterState.size = [];
      // if (filterState.size.length == 0) {
      //   filterState.size.push(e.target.id);
      //   filterState.size = removeDuplicates(filterState.size);
      //   filterAndDisplayData();
      //   // console.log(filterState);
      // } else {
      //   filterState.size = [];
      //   // filterState.size.pop(e.target.id);
      //   if (
      //     filterState.brand === "" &&
      //     filterState.color === "" &&
      //     filterState.size.length === 0
      //   ) {
      //     filteredData = filterByCategory(data, "Women Dresses");
      //     const paginatedItems = paginate(
      //       filteredData,
      //       currentPage,
      //       itemsPerPage
      //     );

      //     renderItems(filteredData, currentPage);
      //     renderPagination(Math.ceil(filteredData.length / itemsPerPage));
      //   }
      // }
      // filterAndDisplayData();
    });
  });
}

// Function to filter and display data
function filterAndDisplayData() {
  filteredData = menShirtsFilter.filter((item) => {
    // console.log(filterState.size);
    // console.log(item.size);
    // console.log(filterState.size.includes(item.size));

    const result = filterState.size.find((element) =>
      item.size.includes(element)
    );
    console.log(result);
    if (filterState.size < 0 && !result) {
      return false;
    } else if (
      item.brand === filterState.brand &&
      item.color === filterState.color &&
      result
    ) {
      return (
        item.brand === filterState.brand &&
        item.color === filterState.color &&
        filterState.size.push(item.size)
      );
    } else if (
      item.brand !== filterState.brand &&
      item.color !== filterState.color &&
      !result
    ) {
      return false;
    } else if (
      item.brand === filterState.brand &&
      filterState.color === "" &&
      !result
    ) {
      return item.brand === filterState.brand;
    } else if (
      item.color === filterState.color &&
      filterState.brand === "" &&
      !result
    ) {
      return item.color === filterState.color;
    } else if (result && filterState.brand === "" && filterState.color === "") {
      return filterState.size.push(item.size);
    }
    console.log(filterState.brand);
    console.log(filterState.color);
    console.log(filterState.size);
    console.log(item.brand);
    console.log(item.color);
    console.log(item.size);
    console.log(filterState);
  });

  // Display paginated data
  const paginatedItems = paginate(filteredData, currentPage, itemsPerPage);

  renderItems(filteredData, currentPage);
  renderPagination(Math.ceil(filteredData.length / itemsPerPage));
}

filteredData = filterByCategory(data, "Men T-Shirts");
const paginatedItems = paginate(filteredData, currentPage, itemsPerPage);

renderItems(filteredData, currentPage);
renderPagination(Math.ceil(filteredData.length / itemsPerPage));
console.log(filterState);
