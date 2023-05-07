import moment from 'moment'
//
const LibTimer = {
  timeoutId: null,
  /**
  * getTimeoutId :
  * @param
  *
  * @return
  */
  getTimeoutId: function()
  {
    return this.timeoutId;
  },
  /**
  * setTimeoutId :
  * @param
  *
  * @return
  */  
  setTimeoutId: function(id: any)
  {
    this.timeoutId = id;
  },
  /**
  * clearTimer :
  * @param
  *
  * @return
  */  
  clearTimer: function(id)
  {
    clearTimeout(id)
  },
}
export default LibTimer;
