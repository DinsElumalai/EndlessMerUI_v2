function setTime()
{
    let dt = new Date();
    let hr = dt.getHours();
    let mins = dt.getMinutes();
    let currTime = addZeroBefore(hr) + ":" + addZeroBefore(mins);
    //document.getElementById("IentryTime").value = currTime;
    console.log(currTime);
    console.log(dt.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
    return currTime;
}

function addZeroBefore(n) 
{
    return (n < 10 ? '0' : '') + n;
}