const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
  
    err.status = err.status || 5000; 
  
    res.status(err.status).json({
      message: err.message || 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? err : {}
    });
  };
  
  export default errorHandler;
  