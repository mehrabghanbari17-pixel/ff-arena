// FF ARENA - Admin Panel

let customs = JSON.parse(localStorage.getItem("ffarena_customs")) || [];

function saveCustom(custom) {
    customs.push(custom);
    localStorage.setItem("ffarena_customs", JSON.stringify(customs));
    alert("کاستوم با موفقیت اضافه شد ✅");
    showCustoms();
}

function deleteCustom(index) {
    if (!confirm("آیا مطمئنی می‌خواهی این کاستوم حذف شود؟")) return;

    customs.splice(index, 1);
    localStorage.setItem("ffarena_customs", JSON.stringify(customs));

    showCustoms();
}

function showCustoms() {
    const list = document.getElementById("customList");

    if (!list) return;

    if (customs.length === 0) {
        list.innerHTML = `
            <div class="empty">
                هنوز کاستومی اضافه نشده است.
            </div>
        `;
        return;
    }

    list.innerHTML = customs.map((item, index) => `
        <div class="custom-card">

            <div>
                <h3>${item.name}</h3>

                <p>نوع: ${item.type}</p>
                <p>ورودی: ${item.entry} تومان</p>
                <p>جایزه: ${item.prize} تومان</p>
                <p>ظرفیت: ${item.capacity} نفر</p>
                <p>وضعیت: ${item.status}</p>
            </div>

            <button onclick="deleteCustom(${index})">
                حذف
            </button>

        </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("customForm");

    if (!form) return;

    form.addEventListener("submit", function(e) {

        e.preventDefault();

        const custom = {
            name: document.getElementById("customName").value,
            type: document.getElementById("customType").value,
            entry: document.getElementById("customEntry").value,
            prize: document.getElementById("customPrize").value,
            capacity: document.getElementById("customCapacity").value,
            rules: document.getElementById("customRules").value,
            status: document.getElementById("customStatus").value
        };

        saveCustom(custom);

        form.reset();
    });

    showCustoms();
});
