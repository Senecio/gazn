// 10:34 2017/3/23
// create by li shihai

var Config = {
    
    lister_port : 34443,
    /*
    db_host : '58dc68f83bd4f.gz.cdb.myqcloud.com',
    db_port : 5818,
    db_database : 'nc',
    db_user : 'cdb_outerroot',
    db_password : '0217104lsh',*/

    /*
    db_host : 'localhost',
    db_port : 3306,
    db_database : 'nc',
    db_user : 'root',
    db_password : '123456', */
    
    db_host : 'bdm25324667.my3w.com',
    db_port : 3306,
    db_database : 'bdm25324667_db',
    db_user : 'bdm25324667',
    db_password : '0217104lsh', 
    
    GetUserTableName : function () {
        return 'farm_user';
    },
    
    GetGameTableName : function () {
        return 'farm_game';
    }
}

if(typeof module !== 'undefined')
    module.exports = Config;