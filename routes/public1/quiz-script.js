let currentQuestion  = 0;
let score = 0;
let container = document.getElementById('quizContainer')
let questionEl = document.getElementById('question')
let opt1 = document.getElementById('opt1')
let opt2 = document.getElementById('opt2')
let opt3 = document.getElementById('opt3')
let opt4 = document.getElementById('opt4')
let totQuestions = questions.length;
let nextButton = document.getElementById('nextButton');
let solution = [];
function loadQuestion(questionIndex){
    let q  = questions[questionIndex];
    questionEl.textContent = (questionIndex + 1)+ '. '+q.question;
    opt1.textContent = q.option1;
    opt2.textContent = q.option2;
    opt3.textContent = q.option3;
    opt4.textContent = q.option4;
}


/*function loadNextQuestion(){
    let selectedOption = document.querySelector('input[type=radio]:checked');
    if(!selectedOption){
       // alert('Please select your answer!')
        currentQuestion++;
        loadQuestion(currentQuestion)
        return;
     }
    selectedOption.checked = false;
    let answer = selectedOption.value;
    if(questions[currentQuestion].answer ==answer )
    {
        score = score +10;
    }
    currentQuestion++;

    loadQuestion(currentQuestion);
}*/
let remove = document.getElementById('removeoption')
let mapping = []
let storing = []
storing.fill(0)
remove.onclick = function(){
    let selectedOption = document.querySelector('input[type=radio]:checked');
    selectedOption.checked = false;
    solution[currentQuestion] = 0;
    document.getElementById(mapping[currentQuestion]).style.backgroundColor = "red"
}
let submit = document.getElementById('submit')
//let proceed = document.getElementById('proceed')
//let Confirmation = document.getElementById('Confirmation')
//let conatiner = document.getElementById('container')
//proceed.onclick = function(){
   
  //  conatiner.style.display = 'none';
   // Confirmation.style.display = '';
//}
submit.onclick = function(){
    //let email = document.getElementById('exampleInputEmail1').value
    //if(!email){
        
      //  alert("First Enter the details")
        //conatiner.style.display = 'none';
        //conatiner.style.display = 'none';
        //Confirmation.style.display = '';
        //return;
    //}
    console.log(solution)
   for(let i  = 0 ; i <= 7 ; i++)
    {
        if(solution[i] == questions[i].answer)
        {
            score = score + 10;
        }
    }
    console.log(score)
    $.post('/submit',{
        //username : email,
        result:score
    },(data)=>{
        if(data.success)
        {  
            
            alert("YOUR SCORE HAS BEEN SUBMITTED")
        }
    }).fail((data)=>{
        alert("Your Score has not been submitted")
    })
   /* $.get('/submit',(data)=>{
        if(data.success)
        {
            console.log("Fully submitted")
        }
        else{
            console.log("Not Submitted")
        }
    })*/
}
nextButton.onclick = function(){
    currentQuestion++;
    loadQuestion(currentQuestion)
    
    if(document.getElementById(mapping[currentQuestion]).style.backgroundColor === "green")
    {
        let x = document.getElementById(storing[currentQuestion])
        x.checked = true
        
        return;
    }
    if(!document.getElementById('1').checked&&!document.getElementById('2').checked&&!document.getElementById('3').checked&&!document.getElementById('4').checked)
    {
        document.getElementById(mapping[currentQuestion]).style.backgroundColor = "red"
        return;
    }
    let selected = document.querySelector('input[type=radio]:checked')
    selected.checked = false;
    document.getElementById(mapping[currentQuestion]).style.backgroundColor = "red"
}
let confirm = document.getElementById('saveButton')
confirm.onclick = function(){
    let selectedOption = document.querySelector('input[type=radio]:checked');
   
    if(!selectedOption)
    {  solution[currentQuestion] = 0;
        return;
    }
    storing[currentQuestion] = selectedOption.value
    solution[currentQuestion] = selectedOption.value
    document.getElementById(mapping[currentQuestion]).style.backgroundColor  = "green"
}
loadQuestion(currentQuestion)
let q1 = document.getElementById('Q.1')
let q2 = document.getElementById('Q.2')
let q3 = document.getElementById('Q.3')
let q4 = document.getElementById('Q.4')
let q5 = document.getElementById('Q.5')
let q6 = document.getElementById('Q.6')
let q7 = document.getElementById('Q.7')
let q8 = document.getElementById('Q.8')
let q9 = document.getElementById('Q.9')
let q10 = document.getElementById('Q.10')
let q11 = document.getElementById('Q.11')
let q12 = document.getElementById('Q.12')
let q13 = document.getElementById('Q.13')
let q14 = document.getElementById('Q.14')
let q15 = document.getElementById('Q.15')
let q16 = document.getElementById('Q.16')
let q17 = document.getElementById('Q.17')
let q18 = document.getElementById('Q.18')
let q19 = document.getElementById('Q.19')
let q20 = document.getElementById('Q.20')
let q21 = document.getElementById('Q.21')
let q22 = document.getElementById('Q.22')
let q23 = document.getElementById('Q.23')
let q24 = document.getElementById('Q.24')
let q25 = document.getElementById('Q.25')
let q26 = document.getElementById('Q.26')
let q27 = document.getElementById('Q.27')
let q28 = document.getElementById('Q.28')
let q29 = document.getElementById('Q.29')
let q30 = document.getElementById('Q.30')
mapping[0] = "Q.1";
mapping[1] = "Q.2";
mapping[2] = "Q.3";
mapping[3] = "Q.4";
mapping[4] = "Q.5";
mapping[5] = "Q.6";
mapping[6] = "Q.7";
mapping[7] = "Q.8";
q1.onclick = function(){
    let e = q1.value;
    e = parseInt(e)
    
    
    //console.log(q4)
    loadQuestion(e)
    currentQuestion = e;
    if(q1.style.backgroundColor=== "green")
    {
        
        let x = document.getElementById(storing[currentQuestion])
        x.checked = true
        return;
    }
    q1.style.backgroundColor = "red"
}
q2.onclick = function(){
    let e = q2.value;
    e = parseInt(e)
    //console.log(q1)
    loadQuestion(e)
    currentQuestion = e;
    if(q2.style.backgroundColor=== "green")
    {
        
        let x = document.getElementById(storing[currentQuestion])
        x.checked = true
        return;
    }
    q2.style.backgroundColor = "red"
}
/*q2.onclick = function(){
    q2.style.backgroundColor = "blue";
    let e = q2.value;
    e = parseInt(e)
    console.log(q2)
    loadQuestion(e)
}*/
q1.style.backgroundColor = "red"