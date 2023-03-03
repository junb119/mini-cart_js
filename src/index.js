// 이 곳에 정답 코드를 작성해주세요.
// 주의사항 ❗️
// HTML 태그의 class, id는 수정하지 않고 그대로 사용합니다.
// CSS 파일, 상품 목록 데이터를 위한 파일들 (src/api/productData.json과 src/asset 하위의 이미지 파일들)은 수정하지 않습니다.
// 기본 코드의 package.json에 명시된 라이브러리 외의 별도의 라이브러리 설치를 허용하지 않습니다.
// 기본적으로 index.js 파일에 작성하되, 기능 별 / 컴포넌트 별로 코드를 분리해주세요.

import getProductData from './api/getProductData.js';
import ProductList from './component/ProductList.js';
import CartList from './component/CartList.js';

// 권장사항 👍
// API 요청을 위한 함수는 별도의 파일로 분리하는 것을 권장합니다.
// 일관성 있는 네이밍을 유지해주세요.
// 반복되는 기능은 하나로 통일해주세요.
// ES6(ES2015) 이후의 모던 자바스크립트 문법을 활용해주세요.

// 요구사항 ✅
// 1. 비동기 API 요청 모킹하기
// src/api/productData.json 파일에 상품 목록 데이터(더미 데이터)가 저장되어 있습니다.
// 이 데이터를 바로 import 해 사용하는 것이 아니라, fetch API를 통해 비동기로 데이터를 받아와 사용하도록 구현해주세요.

const $productListGrid = document.getElementById('product-card-grid');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $shoppingCart = document.getElementById('shopping-cart');
const $backdrop = document.getElementById('backdrop');
const $cartList = document.getElementById('cart-list');
// const $paymentBtn = document.getElementById('payment-btn');
let productData = {};

const productList = new ProductList($productListGrid, []);
const cartList = new CartList($cartList, []);

// 2. 상품 목록 렌더링하기
// main 브랜치의 보일러플레이트 코드에는 상품 목록 마크업이 하드코딩 되어 있습니다. (src.index.html)
// 하드코딩 되어 있는 마크업 코드를 참고해, 1에서 가져오도록 구현한 더미 데이터를 바탕으로 상품 목록을 렌더링하도록 html 코드를 수정해주세요.
// 데이터가 없을 때는 "상품이 없습니다" 라는 텍스트를 보여주어야 합니다.
// 모든 가격은 천 단위의 화폐 표기법에 맞게, 천 단위마다 쉼표를 사용해 렌더링해야 합니다.

const fetchProductData = async () => {
  const result = await getProductData();
  productList.setState(result);
  productData = result;
};

// 3. 장바구니 토글 기능
// 상단 우측의 장바구니 아이콘을 누르면 장바구니가 열려야 합니다.
// 상품 카드를 클릭하면 장바구니가 열려야 합니다.
// 장바구니가 열린 상태에서, backdrop(검은 배경)을 누르면 장바구니가 닫혀야 합니다.
// 장바구니가 열린 상태에서, 장바구니 상단 우측의 X 아이콘을 누르면 장바구니가 닫혀야 합니다.
const toggleCart = () => {
  $shoppingCart.classList.toggle('translate-x-full');
  $shoppingCart.classList.toggle('translate-x-0');
  $backdrop.hidden = !$backdrop.hidden;
};
// 4. 장바구니 렌더링하기
// main 브랜치의 보일러플레이트 코드에는 장바구니 마크업이 하드코딩 되어 있습니다. (src.index.html)
// 처음 접속할 경우엔 장바구니가 비어 있어야 하고, 사용자 상호작용에 따라 장바구니 상태를 관리해야 합니다.
// 하드코딩 되어 있는 마크업 코드를 참고해, 장바구니 데이터를 바탕으로 장바구니 목록을 렌더링하도록 html 코드를 수정해주세요.
// 5. 장바구니 추가 기능
// 상품 카드를 클릭하면 해당 상품이 장바구니에 추가되어야 합니다.
// 장바구니에 보여지는 상품 정보는 아래와 같습니다. (이름, 가격, 수량)

const addCartItem = (e) => {
  // 상품 장바구니에 추가하기
  // 어떤 상품이 추가되었는가?
  const clickedProduct = productData.find((product) => {
    return product.id == e.target.dataset.productid;
  });
  if (!clickedProduct) return;
  cartList.addCartItem(clickedProduct);

  toggleCart();
};

const modifyCartItem = (e) => {
  const currentProductId = parseInt(e.target.closest('li').id);
  switch (e.target.className) {
    case 'increase-btn':
      // 상품 수량 + 1
      cartList.increaseCartItem(currentProductId);
      break;
    case 'decrease-btn':
      // 상품 수량 - 1
      cartList.decreaseCartItem(currentProductId);
      break;
    case 'remove-btn':
      // 상품 삭제
      // 현재 클릭된 삭제한다
      console.log(e.target);
      cartList.removeCartItem(currentProductId);
      break;
    default:
      return;
  }
};
// const saveToLocalStorage = () => {
//   // 장바구니 데이터를 local
// };

fetchProductData();

$openCartBtn.addEventListener('click', toggleCart);
$closeCartBtn.addEventListener('click', toggleCart);
$backdrop.addEventListener('click', toggleCart);
$productListGrid.addEventListener('click', addCartItem);
$cartList.addEventListener('click', modifyCartItem);
// $paymentBtn.addEventListener('click');
// 6. 장바구니 총 가격 합산 기능
// 장바구니 하단에 현재 장바구니에 담겨있는 상품 가격들의 총 합을 표시해주어야 합니다.

// 7. 장바구니 상품 삭제 기능
// 장바구니 목록에서 삭제하기 글씨를 클릭하면 해당 상품이 삭제됩니다.
// 변경된 목록에 맞게 장바구니 목록의 총 합계 금액도 변경되어야 합니다.

// 8. 장바구니 상품 중복 추가 방지 기능
// 상품 목록에서 이미 장바구니에 담겨있는 상품을 클릭했을 때는, 장바구니 내 해당 상품의 수량이 증가해야 합니다.

// 9. 장바구니 상품 수량 수정 기능
// 장바구니 목록에서 - 버튼을 클릭하면 해당 상품의 수량이 1 감소하고, + 버튼을 누르면 해당 상품의 수량이 1 증가합니다.
// 변경된 수량에 맞게 장바구니 목록의 합계 금액도 변경되어야 합니다.
// 최소 수량은 1개, 최대 수량은 10개입니다.
// 최소 수량에 도달한 경우 - 버튼을 눌러도 수량이 감소하지 않고, "장바구니에 담을 수 있는 최소 수량은 1개입니다." 라는 alert 창을 보여줍니다.
// 최대 수량에 도달한 경우 + 버튼을 눌러도 수량이 증가하지 않고, "장바구니에 담을 수 있는 최대 수량은 10개입니다." 라는 alert 창을 보여줍니다.

// 10. Web Storage API를 사용한 장바구니 데이터 저장 기능
// 장바구니의 결제하기 버튼을 누르면 장바구니 데이터를 브라우저에 저장합니다.
// 브라우저에 장바구니 데이터가 저장되어 있는 경우, 장바구니 렌더링 시 해당 데이터를 보여줍니다. (새로고침 해도 장바구니 유지)
