// const wrap=document.querySelectorAll('#book-list li .name');
// // console.log(wrap)

// wrap.forEach(function(book)
//     {
//         book.textContent+=' test'
//     })

// const bookList=document.querySelector('#book-list')
// // console.log(bookList.innerHTML)
// // bookList.innerHTML='<h2>Helo wor ld</h2>'
// bookList.innerHTML+="<p>This is what wae added</p>";

// let banner=document.querySelector('#page-banner')
// console.log('#page banner type is ',banner.nodeType)
// console.log('#page banner Name is ',banner.nodeName)
// console.log('#page banner child Node is ',banner.hasChildNodes())

// //to Clone banner

// const clonedBanner=banner.cloneNode(true);
// //Passing true means it will clone each child recursively
// // if no true then it will give only first line

// console.log(clonedBanner)

// const bookList=document.querySelector('#book-list');
// console.log('Parent nfir is ',bookList.parentNode)
// console.log('Parent nfir is ',bookList.parentElement.parentNode)
// console.log('Child node is ',bookList.children)

// let bookList=document.querySelector('#book-list')
// console.log('book-list  next sibling is',bookList.nextSibling);
// console.log('book-list  next sibling  element is',bookList.nextElementSibling);
// // Use previous replacig next
// bookList.previousElementSibling.querySelector('p').innerHTML+='<br /> Too Cool for everyone'


let btns=document.querySelectorAll('#book-list .delete');
btns.forEach(function(btn)
{
   btn.addEventListener('click',function(e){
       const li=e.target.parentElement;
       console.log(e.target)
       li.parentNode.removeChild(li);
   }) 
}) 
const link=document.querySelector('#page-banner p')
link.innerHTML+='<a href="https://www.youtube.com/watch?v=ndz6iH6o1ms&list=PL4cUxeGkcC9gfoKa5la9dsdCNpuey2s-V&index=9"><br>Hello</a>'
link.addEventListener('click',function(e){
    e.preventDefault();
    console.log('navigation to',e.target.textContent,'prevented');
})

const list=document.querySelector('#book-list ul');
list.addEventListener('click',function(e)
{
    if(e.target.className=='delete')
    {
        const li=e.target.parentElement;
        console.log(e.target)
        list.removeChild(li);
    }
})

const addForm=document.forms['add-book'];
addForm.addEventListener('submit',function(e)
{
    e.preventDefault();
    const value=addForm.querySelector('input[type="text"]').value;
    
    //create element
    const li=document.createElement('li');
    const bookName=document.createElement('span');
    const deleteBtn=document.createElement('span');

    // add content
    deleteBtn.textContent='delete';
    bookName.textContent=value;

    //add class list
    bookName.classList.add('name');
    deleteBtn.classList.add('delete');


    //  how to append
    li.appendChild(bookName);
    li.appendChild(deleteBtn);
    list.appendChild(li);
})


