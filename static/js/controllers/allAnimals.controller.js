window.onload = function() {
    $('#nav-btn-all-animals').addClass('active');
};

$(() => {
    let input = $('#searchField');
    let searchBtn = $('#searchBtn');
    let users = $('.username');

    let usernames = [];

    for (let i = 0; i < users.length; i += 1) {
        usernames[i] = users[i].innerText;
    }

    input.typeahead({ source: usernames, showHintOnFocus: true, items: 'all' });
    let warning = $('#warning');

    searchBtn.on('click', () => {
        let inputValue = $('#searchField').val();
        let petsList = $('.petsList > li');
        let isFound = false;
        petsList.hide();
        warning.hide();

        for (let i = 0; i < petsList.length; i += 1) {
            let username = petsList[i].childNodes[4].innerText.split(':')[1];
            if (inputValue.length === 0) {
                break;
            }
            else if (inputValue === username) {
                petsList[i].style.display = "block";
                isFound = true;
            }
            else if (i === petsList.length - 1 && !isFound) {
                warning.show();
            }
        }
    })
});

let $edit = $('.edit');
$edit.on('click', (event) => {
    let $editButton = $(event.target);
    let li = event.target.parentElement.parentElement;

    $editButton.hide();
    let $okButton = $editButton.next();
    $okButton.show();

    let formText = event.target.parentElement.innerText;
    formText = formText.split(':');
    formText = formText[1];

    let input = $editButton.prev();
    let inlineText = input.prev();
    inlineText.hide();
    input.val(formText);
    input.show();

    $okButton.on('click', () => {
        input.hide();
        $okButton.hide();
        $editButton.show();

        inlineText.text(input.val());
        inlineText.show();
    });

    let updateBtn = li.lastElementChild;
    updateBtn.style.display = "block";

    $(updateBtn).on('click', (event) => {
        event.preventDefault();
        let currentBtn = $(event.target).hide();
        cancelButton.hide();
        $okButton.hide();
        input.hide();
        inlineText.show();
        $editButton.show();

        let currentId = $(li)[0].id;
        let ownerAddress = $(li).children()[5].innerText.split(':')[1];
        let ownerPhone = $(li).children()[6].innerText.split(':')[1];
        let checkUp = $(li).children()[7].innerText.split(':')[1];

        $.ajax({
            method: "PUT",
            url: "/animals",
            contentType: "application/json",
            data: JSON.stringify({
                _id: currentId,
                ownerAddress: ownerAddress,
                ownerPhone: ownerPhone,
                checkUp: checkUp,
            })
        })
    });

    let cancelButton = $(updateBtn).prev().show();

    cancelButton.on('click', (event) => {
        event.preventDefault();
        let $cancelButton = $(event.target);
        $cancelButton.next().hide();
        $cancelButton.hide();
        input.hide();
        inlineText.show();
        $editButton.show();
        $okButton.hide();
    })
});