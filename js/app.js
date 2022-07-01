let button = document.getElementById("fetchbtn");
console.log(button)
button.addEventListener("click", btnhandler);
function btnhandler() {
    // console.log("you have clicked the button");
    let searchWord = document.getElementById("searchWord");
    searchWord = searchWord.value;
    // console.log(searchWord);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`, true)
    xhr.onload = function () {
        if (this.status === 200) {
            searchWord = JSON.parse(this.responseText);
            console.log(searchWord);
            searchWord = searchWord[0];
            let meanings;let html='';
           for( key in searchWord)
           {   if(key=='phonetic')
           {
            html+=`<div class="card my-4" style="width: 20rem;margin: auto;">
            <div class="card-header" id="meaning">
                <h4>Phonetic :</h4>
            </div>
            <div id="meaning-text" style="font-size: 1.2rem ;padding: 10px;">
                ${searchWord[key]}
            </div>
        </div>`

           }
               if(key=='meanings')
               {
                  meanings=searchWord[key];
               }
           }
           console.log(meanings);
        //    console.log(meanings.length);
           
           for (let index = 0; index < meanings.length; index++) {
              let element = meanings[index];
              
               for ( key in meanings[index]) {
                  if(key=='definitions')
                  {
                    
                   html+=`<div class="card my-4" style="width: 20rem;margin: auto;">
                   <div class="card-header" id="meaning">
                       <h4>Meaning ${index+1}:</h4>
                   </div>
                   <div id="meaning-text" style="font-size: 1.2rem ;padding: 10px;">
                       ${meanings[index][key][0]['definition']}
                   </div>
               </div>`
                
                  }
               }
           }
           cards=document.getElementById('cards');
                 cards.innerHTML=html;
        }
        else {
            let dismiss = document.getElementById("dismiss");
            dismiss.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" style="/* z-index:3 ; */position: absolute;top: 0px;width: 100%;" role="alert">
            <strong>Sorry!</strong> We are not able to find this word
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;
            setTimeout(() => { dismiss.innerHTML = '' }, 2000
            )

            // console.log("sorry We dont have this word")
        }
    }
    xhr.send();
}
