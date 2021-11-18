/*Media querry changed state*/
const mediaQuery = window.matchMedia('(min-width: 900px)');
let isDesktopMode = false;

function handleTabletChange(e) 
{
  // Check if the media query is true
  if (e.matches) //if viewports at least 900px wide
  { 
    isDesktopMode = true; 
  }
  else//if viewports less than 900px wide
  {     
    isDesktopMode = false;
  }
}
// Register event listener
mediaQuery.addListener(handleTabletChange);

// Initial check
handleTabletChange(mediaQuery)

// -------------display MENU--------------
document.getElementById('menu-open').addEventListener("click", () => 
{
    if(!isDesktopMode)
    {
        document.getElementById("menu").style.display = "block";
        document.getElementById("menu-bg").style.display = "block";        
        document.getElementById("menu-open").style.display = "none";
        document.getElementById("menu-close").style.display = "inline";
    }
});

document.getElementById('menu-close').addEventListener("click", () => 
{
    if(!isDesktopMode)
    {
        document.getElementById("menu").style.display = "none";
        document.getElementById("menu-bg").style.display = "none";
        document.getElementById("menu-open").style.display = "inline";
        document.getElementById("menu-close").style.display = "none";
    }
});

// -------------display back pannel--------------
document.getElementById('back-project-btn').addEventListener("click", () => 
{

    document.getElementById("back-project-pannel").style.display = "block";
    initPledegesRef();
});

document.getElementById('close-back-pannel').addEventListener("click", () => 
{
    document.getElementById("back-project-pannel").style.display = "none";
    initPledegesRef();
});

// -------------Click on PLEDGE--------------
const pledgesRef = document.getElementsByClassName("pledge-container");

function initPledegesRef()
{
    //remvove focus style border from all the elements exepts last one (because non-avaible and doesn't has all sub-elems)
    for (var y = 0; y < pledgesRef.length-1; y++)
        {
            pledgesRef[y].style.border = "1px solid grey";
            pledgesRef[y].children[1].style.display = "none"; 
            pledgesRef[y].children[2].style.display = "none"; 
            pledgesRef[y].getElementsByClassName("pledge-checked-icon")[0].style.backgroundColor = "hsla(176, 50%, 47%, 0)";
        }
}

for(i = 0;  i < pledgesRef.length; i++)
{
    pledgesRef[i].addEventListener("click", function() 
    {
        initPledegesRef()

        // current element clicked
        this.style.border = "1px hsl(176, 50%, 47%) solid";
        this.children[1].style.display = "block"; 
        
        if(isDesktopMode)
            this.children[2].style.display = "flex"; 
             
        else this.children[2].style.display = "block";

        this.getElementsByClassName("pledge-checked-icon")[0].style.backgroundColor = "hsla(176, 50%, 47%, 100)";   
    });
}

//---------- Click on continue btn-------------------
const continueBtnRef = document.getElementsByClassName("custom-pledge-contniue-btn");
for(i=0; i < continueBtnRef.length; i++)
{    
    continueBtnRef[i].addEventListener("click", function() 
    {        
        initPledegesRef();
        document.getElementById("thanks-message-pannel").style.display = "block";
        document.getElementById("back-project-pannel").style.display = "none";        
    });
}

// Click got it btn
document.getElementById("got-it-btn").addEventListener("click", function() 
{
    document.getElementById("thanks-message-pannel").style.display = "none";
});


// Select Reward
const selectRewardRef = document.getElementsByClassName("select-btn");

for(i=0; i < selectRewardRef.length; i++)
{    
    selectRewardRef[i].addEventListener("click", function() 
    {                
        document.getElementById("back-project-pannel").style.display = "block";   
        
        // we select the matching pledge
        for(y=0; y < selectRewardRef.length-1; y++)
        {
            if(this === selectRewardRef[y])
            {
                initPledegesRef();
                pledgesRef[y+1].scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
                pledgesRef[y+1].style.border = "1px hsl(176, 50%, 47%) solid";
                pledgesRef[y+1].children[1].style.display = "block"; 

                if(isDesktopMode)
                {                 
                    pledgesRef[y+1].children[2].style.display = "flex"; 
                }
                    
                else pledgesRef[y+1].children[2].style.display = "block";

                pledgesRef[y+1].getElementsByClassName("pledge-checked-icon")[0].style.backgroundColor = "hsla(176, 50%, 47%, 100)";   
            }
        }
    });
}