// Get Elements

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submitBtn");
let search = document.getElementById("search");
let tbody = document.getElementById("tbody");
let btnDelete = document.getElementById("deleteAllBtn");
let productsCount = document.getElementById("productsCount");
let emptyState = document.getElementById("emptyState");
let productForm = document.getElementById("productForm");
let mode = "Create";
let temp;

// Get Total
function GetTotal()
{
    if (price.value !== "")
    {
        let result =(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } 
    else 
    {
        total.innerHTML = "0";
        total.style.background = "rgb(219, 10, 10)";
    }
}

// Create Product & Get Data From LocalStorage
let DataPro;

if (localStorage.product != null)
{
    DataPro = JSON.parse(localStorage.product);
} 
else
{
    DataPro = [];
}

// Submit Form
productForm.onsubmit = function (e)
{
    e.preventDefault();

    let NewPro = {
        title: title.value.trim().toLowerCase(),
        price: price.value,
        taxes: taxes.value || 0,
        ads: ads.value || 0,
        discount: discount.value || 0,
        total: total.innerHTML,
        count: count.value,
        category: category.value.trim().toLowerCase()
    };

    // Validation
    if (NewPro.title !== "" && NewPro.price !== "" && NewPro.category !== "" &&
        (mode === "Update" || (NewPro.count !== "" && +NewPro.count >= 1 && +NewPro.count < 100)))
    {

        if (mode === "Create") 
        {
            if (+NewPro.count > 1) 
            {
                for (let i = 0; i < +NewPro.count; i++) 
                {
                    DataPro.push({ ...NewPro });
                }

            } 
            else 
            {
                DataPro.push({ ...NewPro });
            }
        } 
        else
        {

            DataPro[temp] = NewPro;

            mode = "Create";
            submit.innerHTML = `
                <i class="fa-solid fa-plus"></i>
                Create
            `;

            count.style.display = "block";
        }

        // Save Data
        localStorage.setItem("product", JSON.stringify(DataPro));

        ClearData();
        ShowData();
    }
};

// Clear Inputs
function ClearData() 
{
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "0";
    count.value = "";
    category.value = "";
    total.style.background = "rgb(219, 10, 10)";
}

// Read Products
function ShowData() 
{
    let table = "";
    for (let i = 0; i < DataPro.length; i++)
    {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${DataPro[i].title}</td>
            <td>${DataPro[i].price}</td>
            <td>${DataPro[i].taxes}</td>
            <td>${DataPro[i].ads}</td>
            <td>${DataPro[i].discount}</td>
            <td>${DataPro[i].total}</td>
            <td>${DataPro[i].category}</td>
            <td>
                <button class="update-btn" onclick="UpdateData(${i})">
                    Update
                </button>
            </td>
            <td>
                <button class="delete-btn" onclick="DeleteData(${i})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    }
    tbody.innerHTML = table;

    // Update Products Count
    productsCount.innerHTML = DataPro.length;

    // Show / Hide Empty State
    if (DataPro.length > 0) 
    {
        emptyState.style.display = "none";
    }
    else
    {
        emptyState.style.display = "flex";
    }
}

// Show Data When Page Loads
ShowData();

// Delete Product
function DeleteData(i) {
    DataPro.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(DataPro));
    ShowData();
}

// Delete All Products
function DeleteAll() 
{
    DataPro.splice(0);
    localStorage.removeItem("product");
    ShowData();
}

// Update Product
function UpdateData(i) 
{
    title.value = DataPro[i].title;
    price.value = DataPro[i].price;
    taxes.value = DataPro[i].taxes;
    ads.value = DataPro[i].ads;
    discount.value = DataPro[i].discount;
    category.value = DataPro[i].category;

    GetTotal();

    count.style.display = "none";
    submit.innerHTML = `
        <i class="fa-solid fa-pen"></i>
        Update
    `;

    mode = "Update";

    temp = i;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Search Mood
let SearchMood = "Title";

// Get Search Mood
function GetSearchMood(id) 
{
    if (id === "searchTitleBtn") 
    {
        SearchMood = "Title";
    } 
    else 
    {
        SearchMood = "Category";
    }
    search.placeholder = "Search By " + SearchMood;
    search.focus();
    search.value = "";
    SearchData(search.value);
}

// Search Data
function SearchData(value) {
    let table = "";
    for (let i = 0; i < DataPro.length; i++)
    {
        let searchValue = value.toLowerCase();
        if (SearchMood === "Title") 
        {
            if (DataPro[i].title.includes(searchValue))
            {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${DataPro[i].title}</td>
                    <td>${DataPro[i].price}</td>
                    <td>${DataPro[i].taxes}</td>
                    <td>${DataPro[i].ads}</td>
                    <td>${DataPro[i].discount}</td>
                    <td>${DataPro[i].total}</td>
                    <td>${DataPro[i].category}</td>
                    <td>
                        <button class="update-btn" onclick="UpdateData(${i})">
                            Update
                        </button>
                    </td>
                    <td>
                        <button class="delete-btn" onclick="DeleteData(${i})">
                            Delete
                        </button>
                    </td>
                </tr>
                `;
            }

        } 
        else 
        {
            if (DataPro[i].category.includes(searchValue)) 
            {
                table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${DataPro[i].title}</td>
                    <td>${DataPro[i].price}</td>
                    <td>${DataPro[i].taxes}</td>
                    <td>${DataPro[i].ads}</td>
                    <td>${DataPro[i].discount}</td>
                    <td>${DataPro[i].total}</td>
                    <td>${DataPro[i].category}</td>
                    <td>
                        <button class="update-btn" onclick="UpdateData(${i})">
                            Update
                        </button>
                    </td>
                    <td>
                        <button class="delete-btn" onclick="DeleteData(${i})">
                            Delete
                        </button>
                    </td>
                </tr>
                `;
            }
        }
    }
    tbody.innerHTML = table;
}

// Search Events
document.getElementById("searchTitleBtn").onclick = function () 
{
    GetSearchMood("searchTitleBtn");
};
document.getElementById("searchCategoryBtn").onclick = function () 
{
    GetSearchMood("searchCategoryBtn");
};

search.oninput = function () 
{
    SearchData(search.value);
};

// Delete All Button
btnDelete.onclick = DeleteAll;

// Update Total While Typing
price.oninput = GetTotal;
taxes.oninput = GetTotal;
ads.oninput = GetTotal;
discount.oninput = GetTotal;