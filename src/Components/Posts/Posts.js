import React,{useState,useContext,useEffect} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import {FirebaseContext } from '../../store/firebaseContext';
import { PostContext } from '../../store/PostContext';
import { useHistory } from 'react-router-dom';

function Posts() {
  
  const{firebase}=useContext(FirebaseContext)
  const{setPostDetails}=useContext(PostContext)
  
  const [products,setProducts]=useState([])

  const history=useHistory()

  // useEffect(()=>{
  //   firebase.firestore().collection('products').get().then((snapshot)=>{
  //     const allPost= snapshot.docs.map((product)=>{
  //      return{
  //       ...product.data(),
  //       id:product.id
  //      } 
  //     })
  //     setproducts(allPost)
  //   })
  // },[])

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      try {
        const snapshot = await firebase.firestore().collection('products').get();
        const allPost = snapshot.docs.map(product => ({
          ...product.data(),
          id: product.id
        }));
        setProducts(allPost);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(); // Call the fetchProducts function

  }, [firebase]);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

        {products.map(product=>{

          return <div className="card" onClick={()=>{
            setPostDetails(product)
            history.push('/view')
          }}>
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">Rs.{product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
            </div>
            <div className="date">
              <span>{product.createdAt}1225</span>
            </div>
          </div>
         })
        }

        </div>
      </div>
      <div className="postParentDiv">
      <div className="moreView">
      <h4>Fresh recommendations</h4> 
  <div className="heading">
    
  </div>
  <div className="cards">
    {products
      .sort((a, b) => {
        // Convert createdAt to a timestamp if it's not already
        const dateA = new Date(a.createdAt.seconds ? a.createdAt.seconds * 1000 : a.createdAt);
        const dateB = new Date(b.createdAt.seconds ? b.createdAt.seconds * 1000 : b.createdAt);
        return dateB - dateA; // Sort by date, newest first
      })
      .map((product) => (
        <div
          className="card"
          onClick={() => {
            setPostDetails(product);
            history.push('/view');
          }}
          key={product.id} // Ensure each item has a unique key
        >
          <div className="favorite">
            <Heart />
          </div>
          <div className="image">
            <img src={product.url} alt="" />
          </div>
          <div className="content">
            <p className="rate">Rs.{product.price}</p>
            <span className="kilometer">{product.category}</span>
            <p className="name"> {product.name}</p>
          </div>
          <div className="date">
            <span>{new Date(product.createdAt.seconds ? product.createdAt.seconds * 1000 : product.createdAt).toDateString()}</span>
          </div>
        </div>
      ))}
  </div>
</div>

    </div>
    </div>
  );
}

export default Posts;
