module.exports = {
    // this is just an upgrade function of a Formatted console.log.
    // it takes as parameters ( the file name , the line , a title , element to be logged )
    ConsoleLogFormatted : (file,line,title,element) => {
        console.log("file : "+file+"\nLine : "+line+"\nName : "+title+"\n",element)
    }
}