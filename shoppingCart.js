localStorage.setItem("key","value");//存储变量名为key，值为value的变量 

localStorage.getItem("key");//获取存储的变量key的值

localStorage.removeItem("key")//删除变量名为key的存储变量



    // 商品类
    class Product
        {
          constructor(id,tite,price,print)
          {
            this.id=id;
            this.tite=tite;//名称
            this.price=price;//价格
            this.print=print;//照片地址
          }
        }


    class Order
    {
      constructor(product,qty,selectStatus)
      {
        // 订单类成员
        this.id=product.id;
        this.tite=product.tite;
        this.price=product.price;
        this.print=product.print;
        this.qty=qty;//数量
        this.selectStatus=selectStatus;//选择状态
      }
    }


     
    // 购物车数据类--确定格式用于记录购物车数据
    //包括订单列表、总计商品数量、总计商品样本数、总价格
    //订单列表包括：某类商品。商品数量小计
    //商品包括：商品id、图片、名称、单价
    class CartData
    {
      constructor()
      {
        this.orderList=new Array();
        this.units=0;
        this.totalQty=0;
        this.totalAmount=0;
      }
    }


    //购物车操作类
    class ShoppingCart
    {
      //将购物车数据写入本地存储中
      setDataToLocalSatorge(CartData)
      {
        // 清除原有存储写入新列表
        localStorage.removeItem('LzzyCart');
        // 写入本地储存
        localStorage.setItem('LzzyCart',JSON.stringify(CartData));

      }


      //从本地存储中获取购物车数据
      getDataFromLocalSatorge()
      {
        let lzzyCart =localStorage.getItem('LzzyCart');
        if (lzzyCart == null || lzzyCart == '') 
        {
          return new CartData();
        }
        else 
        {
            return JSON.parse(lzzyCart);
        }


      }


      // 加入购物车
      addToCart(order)
      {
        let cartData=this.getDataFromLocalSatorge()
        var flag=true;
        // for(const i in cartData.orderList)
        for(var i=0;i<cartData.orderList.length;i++)
        {
          if(order.id ==cartData.orderList[i].id)
          {
            flag=false;
            // 新增qty（数量）
            cartData.orderList[i].qty+=order.qty;
            break;
          }
        }

        if(flag)
        {
          // 新商品给样本++
          cartData.orderList.push(order);
          cartData.units++;
        }
        cartData.totalQty +=order.qty;
        cartData.totalAmount +=order.price*order.qty;

        // 写入loslocalStorage
        this.setDataToLocalSatorge(cartData);

      }


      // 清空购物车
      clearCart()
      {
        localStorage.removeItem('LzzyCart');
      }


      //获取选中对象的列表的总数量(获取购物车中订单列表)
      getSelectedList()
      {
        

      }


      // 获取选中对象的列表的总数量（获取选中商品的总数量）
      getSelectedQty()
      {
        let cartData=this.getDataFromLocalSatorge();
        let orderList=cartData.orderList;
        let selectedQty=0;
        for(let i in orderList)
        {
          if(orderList[i].selectStatus)
          {
            selectedQty+=orderList[i].qty;
          }
        }
        return selectedQty;

      }

      // 获取选中对象的列表的总价格（获取选中商品的总数量）
      getSelectedAmount()
      {
        let cartData=this.getDataFromLocalSatorge();
        let orderList=cartData.orderList;
        let selectedAmount=0;
        for (const key in orderList) 
        {
          if (orderList[key].selectStatus) 
          {
              selectedAmount+=orderList[key].price*orderList[key].qty;
          }
        }
        return selectedAmount;


      }




    // // 设置订单状态
    // setItemSelectStatus(id, selectStatus)
    // {
    //   let cartData=this.getDataFromLocalSatorge();
    //   let orderList=cartData.orderList;
    //   let flag=false;
    //   for(const i in orderList)
    //   {
    //     if(id==orderList[i].id)
    //     {
    //       orderList[i].selectStatus=selectStatus;
    //       flag=true;
    //     }
    //   }
    //   if (flag) this.setDataToLocalSatorge(cartData);  
    // }


    setItemSelectStatus(id,selectStatus)
    {
      let cartData=this.getDataFromLocalSatorge();
      let orderList=cartData.orderList;
      // 查找id对应的订单
      let order=this.find(id,orderList);
      // 判断位置，位置空报错 不空设置状态
      if(order==null)
      {
        // 没有找到id
        console.log('订单id有误');
        return;
      }
      else
      {
        // 找到对应id
        order.selectStatus=selectStatus;
      }
      // 写入本地储存
      this.setDataToLocalSatorge(cartData);
    }


    // 查找指定id的订单
    find(id,orderList)
    {
      for(const i in orderList)
      {
        if(id==orderList[i].id)
        {
          return orderList[i];
        }
      }
      return null;
    }





    // 删除指定id的订单
    deleteItem(id)
    {
      let cartData=this.getDataFromLocalSatorge();
      let orderList=cartData.orderList;
      let order=this.find(id,orderList);
      let index=orderList.indexOf(order,0);

      if(index==-1)
      {
        console.log('订单id有误');
      }
      else
      {
        orderList.splice(index,1);
        cartData.totalQty -=order.qty;
        cartData.totalAmount -=order.qty * order.price;
        cartData.units--;
        this.setDataToLocalSatorge(cartData);
      }
    }


    getTotalUnits(){
      let cartData=this.getDataFromLocalSatorge();
      return cartData.units;
  }


    

  
    




    }