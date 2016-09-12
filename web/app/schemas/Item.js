import mongoose,{Schema} from 'mongoose';

const Item = new Schema({
	addr:{type:String, reuquired:true},
	lon:{type:Number, reuquired:true},
	lat:{type:Number, reuquired:true},
	/*_member:{type:Schema.Types.ObjectId, ref:'member'},*/
	regdate:{type:Date, default:Date.now},
	
});

export default mongoose.model('item', Item);