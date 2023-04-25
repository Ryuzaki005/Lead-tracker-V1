
let leadsArray = [] ;
const inputEl = document.querySelector("#input") ;
const saveBtn = document.querySelector("#save-btn") ;
const tabBtn = document.querySelector("#tab-btn") ;
const deleteBtn = document.querySelector("#delete-btn") ;
const UlEl = document.querySelector("#unordered-list-area") ;

if (localStorage.getItem("leadsArray")) {
    leadsArray = JSON.parse(localStorage.getItem("leadsArray"));
    for (let i = 0; i < leadsArray.length; i++) {
        UlEl.innerHTML += `<a href="http://${leadsArray[i]}" target="_blank">
                                <li>
                                    ${leadsArray[i]} 
                                </li>
                            </a>`;
    }
}

function storeTolocalStorage() {
    localStorage.setItem("leadsArray", JSON.stringify(leadsArray))
} 

saveBtn.addEventListener("click", function(){
    inputElValue = inputEl.value ;
    leadsArray.push(inputElValue) ;
    storeTolocalStorage()
    UlEl.innerHTML += `<a href="http://${inputElValue}" target="_blank">
                                <li>
                                    ${inputElValue} 
                                </li>
                        </a>                             
                        ` ;
    inputEl.value = "" ; 
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let url = tabs[0].url ;
        leadsArray.push(url) ;
        storeTolocalStorage()
            UlEl.innerHTML += `<a href="http://${url}" target="_blank">
                                    <li>
                                        ${url} 
                                    </li>
                                </a>                             
                        ` ;
    })
})

deleteBtn.addEventListener("dblclick", function() {
    
    leadsArray = [] ;
    storeTolocalStorage() ;
    UlEl.innerHTML = "" ;
})
