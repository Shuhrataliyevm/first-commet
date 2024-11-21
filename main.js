let students = [
    {
        first_name: "Oybek",
        last_name: "Mirfayzullayev",
        is_active: true,
    },
    {
        first_name: "Ulug'bek",
        last_name: "Shamsiddinov",
        is_active: false,
    },
    {
        first_name: "Ulug'bek",
        last_name: "Abdullayev",
        is_active: false,
    },
    {
        first_name: "Alpomish",
        last_name: "Jaldoshov",
        is_active: false,
    },
    {
        first_name: "Asadbek",
        last_name: "Nurberdiyev",
        is_active: false,
    },
];

let student_table_tbody = document.querySelector("#student_table_tbody");

function render(list = students) {
    student_table_tbody.innerHTML = null;
    list.forEach((item, idx) => {
        // console.log(item);
        let tr = document.createElement("tr");
        tr.classList.add("bg-white", "border-b");

        let td_index = document.createElement("td");
        td_index.classList.add("px-6", "py-4");
        td_index.textContent = idx + 1;

        let td_first_name = document.createElement("td");
        td_first_name.classList.add("px-6", "py-4");
        td_first_name.textContent = item.first_name;

        let td_last_name = document.createElement("td");
        td_last_name.classList.add("px-6", "py-4");
        td_last_name.textContent = item.last_name;

        let td_is_active = document.createElement("td");
        td_is_active.classList.add("px-6", "py-4");
        if (item.is_active) {
            td_is_active.classList.add("text-green-800", "font-bold");
            td_is_active.textContent = "Faol";
        } else {
            td_is_active.classList.add("text-red-800", "font-bold");
            td_is_active.textContent = "No faol";
        }

        let td_actios = document.createElement("td");
        td_actios.classList.add("px-6", "py-4");
        let delete_btn = document.createElement("button");
        delete_btn.textContent = "O'chirish";
        delete_btn.classList.add(
            "bg-red-600",
            "py-2",
            "px-4",
            "rounded-xl",
            "text-white"
        );
        delete_btn.setAttribute("onclick", `deleteUser(${idx})`);
        let edit_btn = document.createElement("button");
        edit_btn.classList.add(
            "bg-orange-600",
            "py-2",
            "px-4",
            "rounded-xl",
            "text-white",
            "mr-2"
        );
        edit_btn.textContent = "Tahrirlash";
        edit_btn.setAttribute("onclick", `editUser(${idx})`);

        td_actios.appendChild(edit_btn);
        td_actios.appendChild(delete_btn);

        // td_is_active.textContent = item.is_active
        tr.appendChild(td_index);
        tr.appendChild(td_first_name);
        tr.appendChild(td_last_name);
        tr.appendChild(td_is_active);
        tr.appendChild(td_actios);

        student_table_tbody.appendChild(tr);
    });
}

render();

let first_name = document.querySelector("#first_name");
let last_name = document.querySelector("#last_name");
let is_active = document.querySelector("#is_active");
function addUser() {
    students.push({
        first_name: first_name.value,
        last_name: last_name.value,
        is_active: is_active.value == "true" ? true : false,
    });
    render();
    clearForm();
}

function deleteUser(index) {
    students.splice(index, 1);
    console.log(students);
    render();
}

let edit_user_index;
let add_user = document.querySelector("#add_user");
let edit_user = document.querySelector("#edit_user");
function editUser(index) {
    add_user.classList.add("hidden");
    edit_user.classList.remove("hidden");
    first_name.value = students[index].first_name;
    last_name.value = students[index].last_name;
    is_active.value = students[index].is_active;
    edit_user_index = index;
}

function editUserHandle() {
    console.log(edit_user_index);
    students.splice(edit_user_index, 1, {
        first_name: first_name.value,
        last_name: last_name.value,
        is_active: is_active.value == "true" ? true : false,
    });
    render();
    clearForm();
    edit_user_index = null;
    add_user.classList.remove("hidden");
    edit_user.classList.add("hidden");
}

function clearForm() {
    first_name.value = "";
    last_name.value = "";
    is_active.value = "true";
}

function searchByName(val) {
    // console.log(val.value);
    let res = students.filter((item) => {
        return item.first_name.toLowerCase().includes(val.value.toLowerCase());
    });
    render(res);
}

function filterByStatus(val) {
    let res = [];
    if (val.value == "all") {
        res = students;
    } else {
        let filter_value = val.value == "true" ? true : false;
        res = students.filter((item) => {
            return item.is_active == filter_value;
        });
    }
    render(res);
}

