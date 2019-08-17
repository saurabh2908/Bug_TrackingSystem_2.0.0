app.factory("fact",function($q,$http,LIST,EDIT,ADD,DELETE,RIGHTS,ISSUES){
    return {
        userlist(){
            let defer = $q.defer();
            $http.get(LIST).then((data)=>{
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            })
            return defer.promise;
        },

        getIssue(){
            let defer = $q.defer();

            $http.get(ISSUES).then((data)=>{
                defer.resolve(data);   
            },(error)=>{
                defer.reject(error);
            });
    
            return defer.promise;
        },
        edit(data){
            let defer = $q.defer();
    
            $http.post(EDIT,JSON.stringify(data)).then((data)=>{
                defer.resolve(data);   
            },(error)=>{
                defer.reject(error);
            });
    
            return defer.promise;
        },

        add(data){
            let defer = $q.defer();
    
            $http.post(ADD,JSON.stringify(data)).then((data)=>{
                defer.resolve(data);   
            },(error)=>{
                defer.reject(error);
            });
    
            return defer.promise;
        },

        delete(data){
            let defer = $q.defer();
    
            $http.post(DELETE,JSON.stringify(data)).then((data)=>{
                defer.resolve(data);   
            },(error)=>{
                defer.reject(error);
            });
    
            return defer.promise;
        },

        rightlist(){
            let defer = $q.defer();

            $http.get(RIGHTS).then((data)=>{
                defer.resolve(data);
            },(error)=>{
                defer.reject(error);
            });

            return defer.promise;
        },

        
    
    }
})