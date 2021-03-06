window.addEventListener('load', function() {
    document.querySelector('.back-to-top').addEventListener('click', function() {
        window.scrollTo(0, 0)
    })

    document.querySelector('.open-feature-btn').addEventListener('click', function() {
        document.querySelector('.feature-list').classList.toggle('active');
        document.querySelector('.navigation-bar').classList.toggle('active');
        document.querySelector('.open-feature-btn').classList.toggle('active');
    })

    function turnLightModeOn() {
        if (document.querySelector('.documents-menu') != null) {
            document.querySelector('.documents-menu').classList.toggle('light-mode')
        }
        if (document.querySelector('.documents-list') != null) {
            document.querySelector('.documents-list').classList.toggle('light-mode')
        }
        if (document.querySelector('.feature-bar') != null) {
            document.querySelector('.feature-bar').classList.toggle('light-mode')
        }
        if (document.querySelector('.contribution-title') != null) {
            document.querySelector('.contribution-title').classList.toggle('light-mode')
        }
        if (document.querySelectorAll('.list-courses-link') != null) {
            document.querySelectorAll('.list-courses-link').forEach(function(e) {
                e.classList.toggle('light-mode')
            })
        }
        if (document.querySelector('.contribution-text') != null) {
            document.querySelector('.contribution-text').classList.toggle('light-mode')
        }
        document.querySelector('section').classList.toggle('light-mode')
        document.querySelector('header').classList.toggle('light-mode')
        document.querySelector('.search-bar').classList.toggle('light-mode')
        document.querySelector('.footer').classList.toggle('light-mode')
        document.querySelector('.light-mode-btn').classList.toggle('light-mode')
        document.querySelectorAll('.document-title').forEach(function(e) {
            e.classList.toggle('light-mode')
        })
    }

    let lightModeOn = localStorage.getItem('light-mode-on')
    if (lightModeOn === null) {
        localStorage.setItem('light-mode-on', 0)
        lightModeOn = localStorage.getItem('light-mode-on')
    } else if (lightModeOn != 0) {
        turnLightModeOn()
    }

    document.querySelector('.light-mode-btn').addEventListener('click', function() {
        turnLightModeOn()
        if (lightModeOn == 0)
            lightModeOn = 1
        else
            lightModeOn = 0
        localStorage.setItem('light-mode-on', lightModeOn)
    })

    document.querySelector('.notification-btn').addEventListener('click', function() {
        alert('Bạn có thể tắt/mở nhạc nền bằng cách click vào dãy sóng âm thanh :D')
    })

    let documentLinks, documentSubjects;
    if (document.querySelectorAll('.documents-link') != null && document.querySelectorAll('.document-subject') != null) {
        documentLinks = document.querySelectorAll('.documents-link')
        documentSubjects = document.querySelectorAll('.document-subject')

        for (let i = 0; i < documentSubjects.length; i++) {
            if (documentLinks[i] != null) {
                documentLinks[i].addEventListener('click', function() {
                    documentLinks[i].classList.add('active')
                    for (let j = 0; j < documentLinks.length; j++) {
                        if (j != i) {
                            documentLinks[j].classList.remove('active')
                        }
                    }
                })
            }
        }

        for (let i = 0; i < documentSubjects.length; i++) {
            documentSubjects[i].addEventListener('mouseover', function() {
                if (documentLinks[i] != null) {
                    documentLinks[i].classList.add('active')
                    documentLinks[i].scrollIntoView()
                    for (let j = 0; j < documentLinks.length; j++) {
                        if (j != i) {
                            documentLinks[j].classList.remove('active')
                        }
                    }
                }
            })
        }
    }

    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
        // Remove extra spaces
        // Bỏ các khoảng trắng liền nhau
        str = str.replace(/ + /g, " ");
        str = str.trim();
        // Remove punctuations
        // Bỏ dấu câu, kí tự đặc biệt
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    }

    let input, filter, documentTitles, listCoursesLink, listCoursesItem, textValue
    let isFound = false
    let minIndexFound = Number.MAX_VALUE

    document.querySelector('.search-bar').addEventListener('keyup', function() {
        input, filter, documentTitles, listCoursesLink, listCoursesItem, textValue
        isFound = false
        minIndexFound = Number.MAX_VALUE
        input = document.querySelector('.search-bar')
        filter = removeVietnameseTones(input.value.toUpperCase())
        listCoursesLink = document.querySelectorAll('.list-courses-link')
        listCoursesItem = document.querySelectorAll('.list-courses-item')
        for (let i = 0; i < listCoursesLink.length; i++) {
            textValue = removeVietnameseTones(listCoursesLink[i].innerText) || removeVietnameseTones(listCoursesLink[i].textContent)
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                listCoursesItem[i].style.display = ''
                if (i < minIndexFound) minIndexFound = i;
                isFound = true
            } else {
                listCoursesItem[i].style.display = 'none'
            }
        }

        listCoursesItem[minIndexFound].scrollIntoView()
    })

    document.querySelector('.search-bar').addEventListener('keypress', function(e) {
        if (e.keyCode === 13) {
            if (!isFound) {
                //alert('Không tìm thấy tài nguyên phù hợp!')
                if (confirm('Không tìm thấy tài nguyên phù hợp! Bạn có muốn tiếp tục nhập thông tin tìm kiếm không ?')) {

                }
                else {
                    input.value = ''
                    isFound = false
                    for (let i = 0; i < listCoursesLink.length; i++) {
                        listCoursesItem[i].style.display = ''
                    }
                }
            }
            else {
                alert(`Tìm thấy tài nguyên: ${listCoursesItem[minIndexFound].textContent}`)
                listCoursesItem[minIndexFound].scrollIntoView()
            }
        }
    })
})