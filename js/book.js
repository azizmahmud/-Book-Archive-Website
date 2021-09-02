

// Load Api 
const loadBooksApi = () => {

    const errorDiv = document.getElementById("error-result");
    errorDiv.innerHTML = "";
    const searchTextInput = document.getElementById("search-text");
    const searchText = searchTextInput.value;

    // Handale empty search 
    if (searchText.length < 0) {
        errorDiv.innerHTML = `<h4 class="text-center">Search Field Cannot be Empty</h4>
        `;
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data))
    }

    searchTextInput.value = "";
}


// Show Result 
const showResult = data => {

    const searchResultDiv = document.getElementById("error-result");
    searchResultDiv.innerHTML = '';


    if (data > 0) {
        searchResultDiv.innerHTML = ` <h4 class="text-center">Search Result : ${data} items </h4>`
    }
    else {
        searchResultDiv.innerHTML = ` <h4 class="text-center text-danger ">No Items Found </h4>`
    }
}

// Display Books in Dom 

const displayBook = data => {


    // Serch Item Result Here
    showResult(data.docs.length)


    const booksContainer = document.getElementById("books-container");
    booksContainer.innerHTML = "";

    data.docs.forEach(book => {

        // Distructring The book object 
        const { title, author_name, first_publish_year, publisher, cover_i } = book;
        const unknown = "Unknown Author";

        // Getting image , Author Name for single Book
        const bookImgUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

        // Create single book Div 
        const booksDiv = document.createElement('div');
        booksDiv.classList.add("col")
        booksDiv.innerHTML = `
    
                <div class="card h-100 shadow-lg rounded">
                    <img src="${bookImgUrl}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Book Name: ${title}</h5>
                        <p><span class="fw-bold">Author:</span> ${author_name ? author_name : unknown}</p>
                        <p><span class="fw-bold">First Publish Year:</span> ${first_publish_year}</p>
                        <p><span class="fw-bold">Publisher:</span> ${publisher}</p>
                        <p class="card-text"></p>
                    </div>
                </div>
            
            `
        booksContainer.appendChild(booksDiv)

    })

}

