exports.getOverview = (req,res) =>{
   res.status(200).render('overview',{
      title:'All Tours'
   })
};


exports.getTourView =(req,res)=>{
   res.status(200).render('tour',{
   title:'Forest Hiker tour'
   });
}