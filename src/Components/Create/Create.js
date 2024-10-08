import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/firebaseContext';
import { useHistory } from 'react-router-dom';  


const Create = () => {

  const [name,setName]=useState('');
  const [category,setCategory]=useState('');
  const [price,setPrice]=useState('');
  const [image,setImage]=useState(null) ;

  const{firebase}=useContext(FirebaseContext)
  const{user}=useContext(AuthContext)

  const history=useHistory()
  const date=new Date()//right now date

  const handleSubmit=()=>{
    const trimmedName = name.trim();
    const trimmedCategory = category.trim();
    const trimmedPrice = price.trim();

    if (!trimmedName || !trimmedCategory || !trimmedPrice) {
      alert('All fields are required and must not be empty or just white spaces.');
      return;
    }
    if (!image) {
      alert('Please select an image.');
      return;
    }

       firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
        ref.getDownloadURL().then((url)=>{
          console.log(url)
          firebase.firestore().collection('products').add({
            name: trimmedName,
            category: trimmedCategory,
            price: trimmedPrice,
            url,
            userId: user.uid,
            createdAt: date.toDateString()

          })
          history.push('/')
        })
       })
  }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input  value={price} onChange={(e)=>setPrice(e.target.value)} className="input" type="number" id="fname" name="Price" />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
          
            <br />
            <input onChange={(e)=>{
               setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
