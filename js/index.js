// handleCategory function start here...
const handleCategory = async () => {
    // get the data from url by fetch
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    // response convert to json format
    const data = await response.json();
    // get the tabContainer ID
    const tabContainer = document.getElementById('tab-container');

    data.data.forEach((category) => {
        // console.log(category.category);
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadVideos('${category.category_id}')" class="tab tab-active btn btn-ghost normal-case text-xl bg-gray-300 hover:bg-[#FF1F3D]  text-white border-none">${category.category}</a>
        `
        tabContainer.appendChild(div);
    })


    // console.log(data.data);

}
const handleLoadVideos = async (categoryId) => {
    // console.log(categoryId);
    const response = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    )
    const data = await response.json();
    
    dataHandle(data);

}
const dataHandle = (data) => {
    const cardContainer = document.getElementById('card-container');
    // console.log(data);
    const blankPage = document.getElementById('blank');
    const sortButton = document.getElementById('sort-video');
    sortButton.addEventListener('click', function () {
        const dataSort = data.data.sort((p1, p2) => {
            const x1 = parseFloat(p1.others.views);
            const x2 = parseFloat(p2.others.views);
            return x2 - x1;
        })
        dataHandle({data:dataSort})

    })
    cardContainer.innerHTML = "";
    blankPage.innerHTML = "";
    // console.log(data.data);
    if (data.data.length <= 0) {
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="grid justify-items-center">
        <img src="images/Icon.png" class="mt-10 mb-6">
        <h2 class="text-5xl font-bold text-center">Oops!! Sorry, There is no <br> content here</h2>
    </div>
    `
        blankPage.appendChild(div);

    }
    else {

        data.data.forEach((videos) => {
            // time part
            console.log(videos);
            const time = videos?.others.posted_date;
            const timeFunction = (time) => {
                if (time <= 3600) {
                    const minute = Math.floor(time / 60);
                    const second = time - minute * 60;
                    return `${minute} minutes ago`
                }
                else if (time >= 3600) {
                    const hour = Math.floor(time / 3600);
                    const remainingSecond = time - hour * 3600;
                    const minute = Math.floor(remainingSecond / 60);
                    const second = remainingSecond - minute * 60;
                    return `${hour}hrs ${minute}min ago`
                }
            }
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card w-80 h-80 bg-base-100">
                <figure class="overflow-hidden rounded-b-xl">
                    <img class="object-cover h-48 w-full" src=${videos?.thumbnail} alt=""/>
                </figure>
                <div class="ml-2 mt-4">
                    <div class="card-title flex justify-items-start	">
                        <img class="rounded-full w-10 h-10 mt-3" src=${videos?.authors[0].profile_picture} alt="">
                        <h3 class="ml-2">${videos?.title}</h3>
                    </div>
                    <div class="ml-14">
                        <p>${videos?.authors[0].profile_name} <span>${(videos?.authors[0].verified) === true ? `<i class="text-[#2568EF] fa-solid fa-circle-check fa-lg"></i>` : ``}</span></p>
                        <h5 class="mt-1 pb-4">${videos?.others?.views} views</h5>
                    </div>
                    <div class="text-center rounded-lg  absolute top-36 right-0 bg-[#171717] text-[#FFFFFF]">${videos?.others.posted_date > 0 ? timeFunction(time) : ""}</div>
                </div>
            </div>
            `
            cardContainer.appendChild(div);
        })

    }

}
// Videos Sort 

const myBlog = () => {
    window.open("blog.html", "_blank");
}
myBlog();
handleCategory();
handleLoadVideos("1000");