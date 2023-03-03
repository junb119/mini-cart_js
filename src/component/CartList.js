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
    let newState;
    const clickedProductId = productData.id;
    const checkedIdx = this.state.findIndex(
      (item) => item.id === clickedProductId
    );
    if (checkedIdx === -1) {
      newState = [...this.state, { ...productData, count: 1 }];
    } else {
      newState = [...this.state];
      newState[checkedIdx].count += 1;
    }

    this.setState(newState);
    console.log(newState);
  }
  removeCartItem(id) {
    // 장바구니 삭제 기능
    // 자기가 삭제해야하는 아이템
    const newState = this.state.filter((item) => item.id !== id);
    this.setState(newState);
  }
  render() {
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
                <p class="ml-4">${item.price.toLocaleString()}원</p>
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
