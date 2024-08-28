import Swal from "sweetalert2";

/**
 * 顯示一個 SweetAlert2 的彈出框
 * 
 * @param {'success' | 'error' | 'warning' | 'info' | 'question'} icon - 彈出框的圖示類型
 * @param {string} title - 彈出框的標題
 * @param {string} text - 彈出框的內容文字
 * @param {string} confirmButtonText - 確認按鈕的文字
 * @param {Object} [options] - 額外的選項
 * @returns {Promise<SweetAlertResult>} - 返回一個 Promise，解析為 SweetAlert2 的結果
 */
const showAlert = (icon, title, text, confirmButtonText, options = {}) => {
    return Swal.fire({
        icon,
        title,
        text,
        confirmButtonText,
        ...options
    });
};

export default showAlert;