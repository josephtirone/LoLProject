import "./style.css";
import Pixelate from "pixelate";
const input = document.getElementById("input");
const startButton = document.getElementById("start-button");
const respButton = document.getElementById("resp-button");
const fundo = document.getElementsByClassName("background")[0];
const imageContainer = document.getElementsByClassName("image")[0];


console.log("image");



document.body.onload = () => {
  
  
  
  let image = document.getElementById("custom");
  
  
  
  
  function LoadChampions(){
        fetch("http://ddragon.leagueoflegends.com/cdn/12.11.1/data/en_US/champion.json")
        .then(data=>data.json())
        .then(({data:champions})=>pickOneChampion(
          
          Object.keys(champions).map(champion=>champions[champion])
          ));
          
        }
        
        async function pickOneChampion (championsList){
          const myChampion = championsList[Math.round(Math.random() * championsList.length)];
          console.log(myChampion);
          
          image.src = `/${myChampion.id}_0.jpg`
          
          let img = new Pixelate(image, {amount: 0});

        let amount = 1;

        const improveQuality = async () => {
          setTimeout(() => {
          image.style.opacity = 1;
          imageContainer.style.width = '298px';
          }, 200)
          setTimeout(() => {
            if (amount > 0) {
            
            amount -= 0.001;
            img.setAmount(amount).render()

              improveQuality();

            }
          }, 100);
        
        }
        
           startButton.addEventListener("click", () => {
            startButton.remove();
            improveQuality();
           });

          const rendleTry = async ()=>{const resposta = prompt("Escreva sua resposta", "");

          console.log(resposta);

           if(resposta.toLowerCase() == myChampion.name.toLowerCase())
           {
             await (()=>{
              fundo.style.backgroundColor = "green";
             })()
             amount = 0;
             img.setAmount(0).render();
             alert("voce ganhou")
             setTimeout(()=>{window.location.reload();}, 2000)
             
           }
           else if(resposta == null){
             alert("esta errado");
           }

           else{
            await (()=>{
              fundo.style.backgroundColor = "red";
             })()
             alert("voce errou")
             setTimeout(()=>{rendleTry();}, 1)
            
             
           }



        }

           respButton.addEventListener("click", rendleTry)
        
    }

    LoadChampions();

  }

