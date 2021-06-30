let posts = []
const btnText = document.querySelector("#btn-text")
const alert = document.querySelector("#alert")
const searchResult = document.querySelector("#search-result")
const tableBody = document.querySelector("#table-body")
const searchButton = document.querySelector("#search-button")

const randomNumber = () => {
    return Math.floor(Math.random() * 10);
}
const fillTable = (tableBody, arr) => {
    if (tableBody.firstChild)
        while (tableBody.firstChild) {
            tableBody.removeChild(tableBody.firstChild);
        }

    arr.forEach(post => {
        let row = document.createElement("tr")
        row.innerHTML = `<td tabindex="-1" role="gridcell" onkeydown='cellKeydownHandler(event)'>${post.userId}</td>
                <td tabindex="-1" role="gridcell" onkeydown='cellKeydownHandler(event)'>${post.id}</td>
                <td tabindex="-1" role="gridcell" onkeydown='cellKeydownHandler(event)'>${post.title}</td>
                <td role="gridcell">
                    <div>
                        <button tabindex="-1" onkeydown="buttonKeydownHandler(event)" 
                        onclick='btnClickHandler(event)' aria-label="data ${post.id}">Data ${post.id}</button> 
                    </div>
                </td>`

        tableBody.appendChild(row)

        // tabindex = 0 to the first cell 
        tableBody.children[0].children[0].setAttribute("tabindex", "0")

    })

}
const fetchData = async () => {
    console.log("fetching ...")
    searchResult.innerHTML = ""
    alert.innerHTML = "Searching posts"
    btnText.innerHTML = "<i style='color:white' class='fa fa-spinner fa-spin fa fa-fw'></i>"

    const resp = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log("Done!")
    alert.innerHTML = ""
    btnText.innerHTML = "Search"

    // Ensuring the search button announcement
    searchButton.blur()
    console.log("Button Blured!")
    setTimeout(() => {
        searchButton.focus()
        console.log("Button Focused!")

    }, 1000)

    posts = resp.data.slice(0, randomNumber())
    console.log(posts)
    let postCount = posts.length
    searchResult.innerHTML = `${postCount} results found`

    fillTable(tableBody, posts)
}

const focusCell = (prevCell, nextCell) => {
    prevCell.setAttribute("tabindex", "-1")
    nextCell.setAttribute("tabindex", "0")
    nextCell.focus()
}

// Handlers
const searchButtonClick = (event) => fetchData()


// Keydown Handlers
const cellKeydownHandler = (event) => {
    const currentElement = event.target
    switch (event.key) {
        case "ArrowUp": {
            event.preventDefault()

            if (currentElement.parentElement.previousElementSibling) {
                let index = Array.prototype.slice.call(currentElement.parentElement.children).indexOf(currentElement)
                let nextUpCell = currentElement.parentElement.previousElementSibling.children[index]

                if (nextUpCell)
                    if (nextUpCell.childElementCount > 0)
                        focusCell(currentElement, nextUpCell.children[0].childre[0])
                    else
                        focusCell(currentElement, nextUpCell)

            }
            break
        }
        case "ArrowDown": {
            event.preventDefault()
            if (currentElement.parentElement.nextElementSibling) {
                let index = Array.prototype.slice.call(currentElement.parentElement.children).indexOf(currentElement)
                let nextDownCell = currentElement.parentElement.nextElementSibling.children[index]

                if (nextDownCell)
                    if (nextDownCell.childElementCount > 0)
                        focusCell(currentElement, nextDownCell.children[0].children[0])

                    else
                        focusCell(currentElement, nextDownCell)
            }
            break
        }

        case "ArrowRight": {
            event.preventDefault()
            if (currentElement.nextElementSibling) {
                let nextCellRight = currentElement.nextElementSibling
                if (nextCellRight.childElementCount > 0)
                    focusCell(currentElement, nextCellRight.children[0].children[0])
                else
                    focusCell(currentElement, nextCellRight)
            }
            break
        }
        case "ArrowLeft": {
            event.preventDefault()
            if (currentElement.previousElementSibling) {
                let nextCellLeft = currentElement.previousElementSibling
                if (nextCellLeft.childElementCount > 0)
                    focusCell(currentElement, nextCellLeft.children[0].children[0])
                else
                    focusCell(currentElement, nextCellLeft)
            }
            break
        }
        case "Home": {
            event.preventDefault()
            focusCell(currentElement, currentElement.parentElement.firstChild)
            break
        }
        case "End": {
            event.preventDefault()
            focusCell(currentElement, currentElement.parentElement.lastChild.children[0].children[0])
            break
        }

    }
}

const buttonKeydownHandler = (event) => {

    const currentElement = event.target

    switch (event.key) {
        case "ArrowUp": {
            event.preventDefault()

            if (currentElement.parentElement.parentElement.parentElement.previousElementSibling) {

                let index = Array.prototype.slice.call(currentElement.parentElement.parentElement.parentElement.children)
                    .indexOf(currentElement.parentElement.parentElement)

                let nextUpCell = currentElement.parentElement.parentElement.parentElement.previousElementSibling.children[index]

                if (nextUpCell) {
                    if (nextUpCell.childElementCount > 0)
                        focusCell(currentElement, nextUpCell.children[0].children[0])
                    else
                        focusCell(currentElement, nextUpCell)

                }
            }

            /* if (currentElement.parentElement.parentElement.previousElementSibling) {

                let index = Array.prototype.slice.call(currentElement.parentElement.parentElement.children)
                    .indexOf(currentElement.parentElement)

                let nextUpCell = currentElement.parentElement.parentElement.previousElementSibling.children[index]

                if (nextUpCell) {
                    if (nextUpCell.childElementCount > 0)
                        focusCell(currentElement, nextUpCell.children[0])
                    else
                        focusCell(currentElement, nextUpCell)
                }
            }*/
            break
        }
        case "ArrowDown": {
            event.preventDefault()
            if (currentElement.parentElement.parentElement.parentElement.nextElementSibling) {

                let index = Array.prototype.slice.call(currentElement.parentElement.parentElement.parentElement.children)
                    .indexOf(currentElement.parentElement.parentElement)

                let nextDownCell = currentElement.parentElement.parentElement.parentElement.nextElementSibling.children[index]

                if (nextDownCell) {
                    if (nextDownCell.childElementCount > 0)
                        focusCell(currentElement, nextDownCell.children[0].children[0])
                    else
                        focusCell(currentElement, nextDownCell)

                }
            }
            break
        }

        case "ArrowRight": {
            event.preventDefault()
            if (currentElement.parentElement.parentElement.nextElementSibling) {
                let nextCellRight = currentElement.parentElement.parentElement.nextElementSiblingt
                if (nextCellRight.childElementCount > 0)
                    focusCell(currentElement, nextCellRight.children[0])
                else
                    focusCell(currentElement, nextCellRight)
            }
            break
        }
        case "ArrowLeft": {
            event.preventDefault()

            if (currentElement.parentElement.parentElement.previousElementSibling) {
                let nextCellLeft = currentElement.parentElement.parentElement.previousElementSibling
                if (nextCellLeft.childElementCount > 0)
                    focusCell(currentElement, nextCellLeft.children[0])
                else
                    focusCell(currentElement, nextCellLeft)
            }
            break
        }
        case "Home": {
            event.preventDefault()
            focusCell(currentElement, currentElement.parentElement.parentElement.parentElement.firstChild)
            break
        }
    }


}

// Click Handlers
const btnClickHandler = (event) => {
    console.log("Displaying data ...")
}