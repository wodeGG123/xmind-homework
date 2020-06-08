module.exports = {
    success:(data)=>{
        return {
            data,
            result:'success',
            code:0
        }
    },
    error:(err)=>{
        return {
            result:'failed',
            code:-1,
            message: String.prototype.toString.call(err)
        }
    }
}