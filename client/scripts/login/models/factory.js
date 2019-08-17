app.factory("factory",($http,$q,LOGIN,CHNGPWD,CHECK)=>{
    return {
        check(){
            let defer = $q.defer();

            $http.get(CHECK).then((data)=>{
                defer.resolve(data);   
            },(error)=>{
                defer.reject(error);
            });

            return defer.promise;
        },


        login(data){
            let defer = $q.defer();

            $http.post(LOGIN,JSON.stringify(data)).then((data)=>{
                defer.resolve(data);   
            },(error)=>{
                defer.reject(error);
            });

            return defer.promise;
        },

        chng(data){
            let defer = $q.defer();

            $http.post(CHNGPWD,JSON.stringify(data)).then((data)=>{
                defer.resolve(data);   
            },(error)=>{
                defer.reject(error);
            });

            return defer.promise;
        },

    }
})