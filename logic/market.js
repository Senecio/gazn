if(typeof module !== 'undefined')
    module.exports = Market;

var updateSql = "UPDATE `farm_game` set `package`=? where `userId`=?";
    
function Market() {

}

// ����Ʒ
Market.prototype.SellItem = function(userId, type, itemId, number, callback) {
    
}
