import { Add, DeleteForever, Remove } from '@material-ui/icons';
import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import { useDispatch,useSelector } from 'react-redux';
import {removeFromCart} from '../redux/actions/shoppingCartAction'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
const KEY='pk_test_51KrNyDEYl23s23aNkwOsrUaOMRChU9HJ6xvYclcgFTC94S8HgEbxof7wyqSwq1CiwE1c2plnxnwmAsgxWFWXIlwc00q8Gu6Zwt'
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  
  
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;


`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
 
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
 
 
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const PriceAndDel=styled.div`
display: flex;
margin-left: 120px;
`
const Del=styled.div`
margin-left: 100px;
padding-top:10px ;
color: red;
cursor: pointer;
font-size:larger ;
`
const Strip=styled.div`
font-size: larger;
/* width: ; */
`
const Cart = () => {
  const dispatch=useDispatch();
  const cart=useSelector(state=>state.cart)
  const{cartItems,totalPrice}=cart;
  const[rangeItem,setRangeItem]=useState([]);
  const[quantity,setQuantity]=useState(1);

const [stripeToken,setStripeToken]=useState('')
const onToken=(token)=>{
setStripeToken(token)
}
// console.log(stripeToken)
useEffect(()=>{
const stripeReq=()=>{
  try{
   const res= axios.post('/checkout',{
     tokenId:stripeToken,
     amount:totalPrice*100
    
   })
   console.log(res.data)
  }catch(err){

  }
}
stripeReq()
},[stripeToken,totalPrice])

  // console.log(cartItems)
// var size = Object.keys(cartItems).length;
// var filtercartItems =  cartItems.filter(item => item.product!==undefined);
//  console.log(filtercartItems )



  return (
    <Container>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
          {cartItems .map((item,key)=>(
          
           <Product key={key}>
              <ProductDetail>
                <Image src={item.foodImg} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {item.foodName} 
                  </ProductName>
                  <ProductId>
                    <b>ID:</b>{item.product}
                  </ProductId>
                  <ProductColor color="black" />
                  <ProductSize>
                    <b>Size:</b> 37.5
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add  onClick={()=>dispatch({type:'INC',payload:item})}/>
                  <ProductAmount>{item.qty}</ProductAmount>
                  <Remove  onClick={()=>dispatch({type:'DEC',payload:item})}/>
                  
                </ProductAmountContainer>
                <PriceAndDel>
                <ProductPrice>{item.qty * item.foodPrice }</ProductPrice>
                <Del >
                  <DeleteForever fontSize="large" onClick={()=>dispatch(removeFromCart(item.product))}/>
                  </Del>   
               </PriceAndDel>
              </PriceDetail>
            </Product>
      
             ))}
            <Hr />
           
          </Info>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <Strip>
            <StripeCheckout
        
              name="FoodSwipe"
              image="https://res.cloudinary.com/cse347/image/upload/v1650646049/FoodSwipe/277916694_424414652779262_4711146425304990146_n_foza7j.png"
              billingAddress
              shippingAddress
              description={`Your total is $${totalPrice}`}
              amount={totalPrice * 100}
              token={onToken}
              stripeKey={KEY}
           
            >
              <Button >CHECKOUT NOW</Button>
     
            </StripeCheckout>
            </Strip>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;