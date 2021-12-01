import * as CryptoJs from "crypto-js";

class Block {
    //declared as static, so even without instance, you can call this function.
    static calculateBlockHash = (
        index:number, 
        previousHash:string, 
        timestamp:number, 
        data:string
        ) : string => 
        CryptoJs.SHA256(index+previousHash+timestamp+data).toString();

    static validateStructure =(aBlock:Block) : boolean => 
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash ==="string" &&
        typeof aBlock.timestamp ==="number" &&
        typeof aBlock.data === "string";
    
    public index:number;
    public hash:string;
    public previousHash : string;
    public data : string;
    public timestamp : number;

    constructor(
        index:number,
        hash:string,
        previousHash : string,
        data : string,
        timestamp : number
    ){
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0, "2020202020202", "", "Hello", 123456);

let blockchain: Block[] = [genesisBlock]; // If it is block, it will be connected. 

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock =() : Block => blockchain[blockchain.length -1];

const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000);

const createMewBlock =(data:string) : Block =>{
    const previousBlock : Block = getLatestBlock();
    console.log(typeof previousBlock.index);
    const newIndex : number = previousBlock.index +1;
    const nextTimeStamp:number = getNewTimeStamp();
    const newHash : string = Block.calculateBlockHash(
        newIndex, 
        previousBlock.hash, 
        nextTimeStamp, 
        data
    );
    const newBlock :Block=new Block(
        newIndex, 
        newHash, 
        previousBlock.hash, 
        data, 
        nextTimeStamp
    );
    addBlock(newBlock);
    return newBlock;
};

const getHashforBlock =(aBlock : Block) : string => 
    Block.calculateBlockHash(
        aBlock.index, 
        aBlock.previousHash, 
        aBlock.timestamp, 
        aBlock.data
    );

const isBlockValid=(candidateBlock : Block, previousBlock:Block) : boolean => {
    if(!Block.validateStructure(candidateBlock)){
        return false;
    } else if(previousBlock.index  +1  !== candidateBlock.index){
        return false;
    } else if(previousBlock.hash !== candidateBlock.previousHash){
        return false;
    } else if (getHashforBlock (candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
    //return true;
};

const addBlock = (candidateBlock : Block) :void =>{
    if(isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
}

createMewBlock("second block");
createMewBlock("third block");
createMewBlock("fourth block");

console.log(blockchain);

export {};