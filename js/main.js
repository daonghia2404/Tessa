window.onload = () => {
    const loader = {
        init:function(){
            this.loading();
        },
        loading:function(){
            const loader = document.querySelector('.loader');

            function hide() {
                loader.classList.add('active');
            }

            setTimeout(hide, 2000);
        }
    }
    loader.init();

    const navigation = {
        init:function(){
            this.menu();
        },
        menu:function(){
            const btn = document.querySelector('.nav__button');
            const menu = document.querySelector('.nav__menu');

            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                menu.classList.toggle('active');
            })
        }
    }
    navigation.init();
    const gallery = {
        init: function () {
            this.popUp('.photos__masonry', 'img');
        },
        popUp: function (selfItem, imageItem) {
            const self = document.querySelectorAll(selfItem);

            // --------------------- Create Popup Element ------------------------ //
            function createPopup() {
                // Setting Popup
                const popUp = document.createElement('div');
                popUp.className = 'gal-popUp';
                popUp.style.cssText = 'position: fixed; z-index: 100; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.5); transition: 0.5s; opacity: 0; pointer-events:none;';

                // Setting Image
                const image = document.createElement('img');
                image.className = 'gal-image';
                image.src = '#';
                image.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); height: 90%; object-fit: contain;';

                // Setting Next Button
                const nextBtn = document.createElement('div');
                nextBtn.className = 'gal-next';
                nextBtn.style.cssText = 'position: absolute; top: 50%; transform: translateY(-50%); right: 10px; color: #fff; font-size: 4rem; cursor: pointer;'
                nextBtn.innerHTML = '<i class="fas fa-angle-right"></i>';

                // Setting Prev Button
                const prevBtn = document.createElement('div');
                prevBtn.className = 'gal-prev';
                prevBtn.style.cssText = 'position: absolute; top: 50%; transform: translateY(-50%); left: 10px; color: #fff; font-size: 4rem; cursor: pointer;'
                prevBtn.innerHTML = '<i class="fas fa-angle-left"></i>';

                // Setting Close Button
                const closeBtn = document.createElement('div');
                closeBtn.className = 'gal-close';
                closeBtn.style.cssText = 'position: absolute; right: 20px; top: 10px; color: #fff; font-size: 4rem; cursor: pointer;'
                closeBtn.innerHTML = '<i class="fas fa-times"></i>';

                // Setting Index of Image
                const index = document.createElement('div');
                index.className = 'gal-index';
                index.style.cssText = 'position: absolute; right: 10px; bottom: 10px; color: #fff; font-size: 2rem;'
                index.innerHTML = '01 / 06';

                self.forEach(i => {
                    i.appendChild(popUp);
                    popUp.appendChild(image);
                    popUp.appendChild(nextBtn);
                    popUp.appendChild(prevBtn);
                    popUp.appendChild(closeBtn);
                    popUp.appendChild(index);
                })
            }
            createPopup();

            // --------------------- Function Popup Element ------------------------ //

            function popUpElement(index) {
                self.forEach(i => {
                    const popup = i.querySelector('.gal-popUp');
                    const items = i.querySelectorAll('img');

                    const image = popup.querySelector('.gal-image');
                    const nextBtn = popup.querySelector('.gal-next');
                    const prevBtn = popup.querySelector('.gal-prev');
                    const closeBtn = popup.querySelector('.gal-close');
                    const indexNumber = popup.querySelector('.gal-index');

                    let indexImage = index;
                    indexNumber.innerHTML = `${indexImage + 1} / ${items.length - 1}`;

                    popup.style.opacity = '1';
                    popup.style.pointerEvents = 'unset';
                    image.src = items[indexImage].src;

                    nextBtn.addEventListener('click', () => {
                        if (indexImage >= items.length - 2) indexImage = -1;
                        indexImage++;
                        image.src = items[indexImage].src;
                        indexNumber.innerHTML = `${indexImage + 1} / ${items.length - 1}`;
                    })

                    prevBtn.addEventListener('click', () => {
                        if (indexImage <= 0) indexImage = items.length - 1;
                        indexImage--;
                        image.src = items[indexImage].src;
                        indexNumber.innerHTML = `${indexImage + 1} / ${items.length - 1}`;
                    })

                    closeBtn.addEventListener('click', () => {
                        popup.style.opacity = '0';
                        popup.style.pointerEvents = 'none';
                    })
                });
            }

            self.forEach(i => {
                const items = i.querySelectorAll(imageItem);

                items.forEach((item, index) => item.addEventListener('click', () => {
                    popUpElement(index);
                }))
            })
        }
    }
    gallery.init()
}
