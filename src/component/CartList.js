const MAX_COUNT = 10;
const MIN_COUNT = 1;

class CartList {
  constructor($target, initialData) {
    this.$target = $target;
    this.$container = document.createElement('ul');
    this.$container.className = 'divide-y divide-gray-200';
    this.$totalCount = document.getElementById('total-count');
    this.state = initialData;
    this.$target.append(this.$container);
    this.render();
  }
  setState(newState) {
    this.state = newState;
    this.render();
  }

  addCartItem(productData) {
    // 현재 장바구니 데이터에, 지금 추가하려고 하는 아이템이 존재하는지를 파악
    // 8. 장바구니 상품 중복 추가 방지 기능
    // 상품 목록에서 이미 장바구니에 담겨있는 상품을 클릭했을 때는, 장바구니 내 해당 상품의 수량이 증가해야 합니다.
    let newState;
    const clickedProductId = productData.id;
    const checkedIdx = this.state.findIndex(
      (item) => item.id === clickedProductId
    );
    if (checkedIdx === -1) {
      newState = [...this.state, { ...productData, count: 1 }];
    } else {
      newState = [...this.state];
      if (newState[checkedIdx].count < 10) {
        newState[checkedIdx].count += 1;
      } else {
        alert(`장바구니에 담을수 있는 최대 수량은 ${MAX_COUNT}개입니다.`);
      }
    }

    this.setState(newState);
    console.log(newState);
  }

  // 9. 장바구니 상품 수량 수정 기능
  // 장바구니 목록에서 - 버튼을 클릭하면 해당 상품의 수량이 1 감소하고, + 버튼을 누르면 해당 상품의 수량이 1 증가합니다.
  // 변경된 수량에 맞게 장바구니 목록의 합계 금액도 변경되어야 합니다.
  // 최소 수량은 1개, 최대 수량은 10개입니다.
  // 최소 수량에 도달한 경우 - 버튼을 눌러도 수량이 감소하지 않고, "장바구니에 담을 수 있는 최소 수량은 1개입니다." 라는 alert 창을 보여줍니다.
  // 최대 수량에 도달한 경우 + 버튼을 눌러도 수량이 증가하지 않고, "장바구니에 담을 수 있는 최대 수량은 10개입니다." 라는 alert 창을 보여줍니다.

  increaseCartItem(id) {
    const newState = [...this.state];
    const checkedIdx = this.state.findIndex((item) => item.id === id);
    if (newState[checkedIdx].count < MAX_COUNT) {
      newState[checkedIdx].count += 1;
      this.setState(newState);
    } else {
      alert(`장바구니에 담을수 있는 최대 수량은 ${MAX_COUNT}개입니다.`);
    }
  }
  decreaseCartItem(id) {
    const newState = [...this.state];
    const checkedIdx = this.state.findIndex((item) => item.id === id);
    if (newState[checkedIdx].count > MIN_COUNT) {
      newState[checkedIdx].count -= 1;
      this.setState(newState);
    } else {
      alert(`장바구니에 담을수 있는 최소 수량은 ${MIN_COUNT}개입니다.`);
    }
  }

  removeCartItem(id) {
    // 7. 장바구니 상품 삭제 기능
    // 장바구니 목록에서 삭제하기 글씨를 클릭하면 해당 상품이 삭제됩니다.
    // 변경된 목록에 맞게 장바구니 목록의 총 합계 금액도 변경되어야 합니다.    // 자기가 삭제해야하는 아이템
    const newState = this.state.filter((item) => item.id !== id);
    this.setState(newState);
  }

  saveToLocalStorage() {
    localStorage.setItem('cartState', JSON.stringify(this.state));
  }

  render() {
    // 6. 장바구니 총 가격 합산 기능
    // 장바구니 하단에 현재 장바구니에 담겨있는 상품 가격들의 총 합을 표시해주어야 합니다.
    this.$totalCount.innerHTML =
      this.state
        .reduce((acc, crr) => crr.price * crr.count + acc, 0)
        .toLocaleString() + '원'; // 장바구니 총 가격 합산 기능 ;
    this.$container.innerHTML = this.state
      .map((item) => {
        return `
          <li class="flex py-6" id="${item.id}">
          <div
            class="h-24 w-24 overflow-hidden rounded-md border border-gray-200"
          >
            <img
              src="${item.imgSrc}"
              class="h-full w-full object-cover object-center"
            />
          </div>
          <div class="ml-4 flex flex-1 flex-col">
            <div>
              <div
                class="flex justify-between text-base font-medium text-gray-900"
              >
                <h3>${item.name}</h3>
                <p class="ml-4">${
                  item.price * item.count.toLocaleString()
                }원</p>
              </div>
            </div>
            <div class="flex flex-1 items-end justify-between">
              <div class="flex text-gray-500">
                <button class="decrease-btn">-</button>
                <div class="mx-2 font-bold">${item.count}개</div>
                <button class="increase-btn">+</button>
              </div>
              <button
                type="button"
                class="font-medium text-sky-400 hover:text-sky-500"
              >
                <p class="remove-btn">삭제하기</p>
              </button>
            </div>
          </div>
        </li>`;
      })
      .join('');
  }
}

export default CartList;
