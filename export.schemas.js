

module.exports.groupByBrand =  [
  
  { '$group': {
    '_id': '$values.reported_brand', 
    'reported_tasks': { '$sum': 1 }, 
    'avrg_task_time': { '$avg': '$values.reported_minutes' }, 
    'total_time': { '$sum': '$values.reported_minutes' },
    'users_reported': { $addToSet: '$values.user_email' },
    'brands_reported': { $addToSet: '$values.reported_brand' },
    'kbf_tasks': { $addToSet: '$values.task_id' },
    'task_status_types': {$push: '$values.task_statustype'},
    'task_complexities': {$push: '$values.reported_complexity'},
    'avrg_complexity': { '$avg': '$values.reported_complexity' },
   }
 }, 
  { $project: {
    _id: 1,
    'users_unique': { $size: '$users_reported' }, 
    'brands_unique': { $size: '$brands_reported' },
    'kbf_tasks': { $size: '$kbf_tasks' },
    'total_time': '$total_time',
    'reported_tasks': '$reported_tasks', 
    'avrg_task_time': '$avrg_task_time', 
    'brands_reported': '$brands_reported',
    'new': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'NUEVO INGRESO']}}}},
    'first_delivery': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'PRIMER ENVIO']}}}},
    'changes': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'CAMBIOS']}}}},
    'rework': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'RETRABAJO']}}}},
    'complexity_1': {$size: {$filter:{input:'$task_complexities', as: 'complexity', cond: {$eq:["$$complexity", 1]}}}},
    'complexity_2': {$size: {$filter:{input:'$task_complexities', as: 'complexity', cond: {$eq:["$$complexity", 2]}}}},
    'complexity_3': {$size: {$filter:{input:'$task_complexities', as: 'complexity', cond: {$eq:["$$complexity", 3]}}}},
    'avrg_complexity': '$avrg_complexity',
},
  },
 {$sort: {
     '_id.vaues.reported_brand': -1,
   }
 }
];

module.exports.groupByDay = [
     { '$group': {
        '_id': {
         'yearMonthDay': {
            '$dateToString': {
              'format': '%Y-%m-%d', 
              'date': '$date_reported' }
          }
        }, 
         'reported_tasks': { '$sum': 1 }, 
         'avrg_task_time': { '$avg': '$values.reported_minutes' }, 
         'total_time': { '$sum': '$values.reported_minutes' },
         'users_reported': { $addToSet: '$values.user_email' },
         'brands_reported': { $addToSet: '$values.reported_brand' },
         'kbf_tasks': { $addToSet: '$values.task_id' },
         'task_status_types': {$push: '$values.task_statustype'},
         'task_complexities': {$push: '$values.reported_complexity'},
         'avrg_complexity': { '$avg': '$values.reported_complexity' },
      }
    }, 
     { $project: {
         _id: 1,
         'users_unique': { $size: '$users_reported' }, 
         'brands_unique': { $size: '$brands_reported' },
         'kbf_tasks': { $size: '$kbf_tasks' },
         'total_time': '$total_time',
         'reported_tasks': '$reported_tasks', 
         'avrg_task_time': '$avrg_task_time', 
         'brands_reported': '$brands_reported',
         'new': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'NUEVO INGRESO']}}}},
         'first_delivery': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'PRIMER ENVIO']}}}},
         'changes': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'CAMBIOS']}}}},
         'rework': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'RETRABAJO']}}}},
         'complexity_1': {$size: {$filter:{input:'$task_complexities', as: 'complexity', cond: {$eq:["$$complexity", 1]}}}},
         'complexity_2': {$size: {$filter:{input:'$task_complexities', as: 'complexity', cond: {$eq:["$$complexity", 2]}}}},
         'complexity_3': {$size: {$filter:{input:'$task_complexities', as: 'complexity', cond: {$eq:["$$complexity", 3]}}}},
         'avrg_complexity': '$avrg_complexity',
      },
     },
    {$sort: {
        '_id.yearMonthDay': -1,
      }
    }
  ];

  module.exports.groupByUser =  [
  
    { '$group': {
      '_id': '$values.user_email', 
      'reported_tasks': { '$sum': 1 }, 
      'avrg_task_time': { '$avg': '$values.reported_minutes' }, 
      'total_time': { '$sum': '$values.reported_minutes' },
      'users_reported': { $addToSet: '$values.user_email' },
      'brands_reported': { $addToSet: '$values.reported_brand' },
      'kbf_tasks': { $addToSet: '$values.task_id' },
      'task_status_types': {$push: '$values.task_statustype'},
      'task_complexities': {$push: '$values.reported_complexity'},
      'days_reported': {$addToSet: {
        'yearMonthDay': {
           '$dateToString': {
             'format': '%Y-%m-%d', 
             'date': '$date_reported' }
         }}},
         'avrg_complexity': { '$avg': '$values.reported_complexity' },
     }
   }, 
    { $project: {
      _id: 1,
      'users_unique': { $size: '$users_reported' }, 
      'brands_unique': { $size: '$brands_reported' },
      'kbf_tasks': { $size: '$kbf_tasks' },
      'total_time': '$total_time',
      'reported_tasks': '$reported_tasks', 
      'avrg_task_time': '$avrg_task_time', 
      'brands_reported': '$brands_reported',
      'new': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'NUEVO INGRESO']}}}},
      'first_delivery': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'PRIMER ENVIO']}}}},
      'changes': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'CAMBIOS']}}}},
      'rework': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'RETRABAJO']}}}},
      'complexity_1': {$size: {$filter:{input:'$task_complexities', as: 'complexity', cond: {$eq:["$$complexity", 1]}}}},
      'complexity_2': {$size: {$filter:{input:'$task_complexities', as: 'complexity', cond: {$eq:["$$complexity", 2]}}}},
      'complexity_3': {$size: {$filter:{input:'$task_complexities', as: 'complexity', cond: {$eq:["$$complexity", 3]}}}},
      'days_reported': { $size: '$days_reported' },
      'avrg_complexity': '$avrg_complexity',
  },
    },
   {$sort: {
       '_id': -1,
     }
   }
  ];

  module.exports.groupByType =  [
  
    { '$group': {
      '_id': '$values.task_statustype', 
      'reported_tasks': { '$sum': 1 }, 
      'avrg_task_time': { '$avg': '$values.reported_minutes' }, 
      'total_time': { '$sum': '$values.reported_minutes' },
      'users_reported': { $addToSet: '$values.user_email' },
      'brands_reported': { $addToSet: '$values.reported_brand' },
      'kbf_tasks': { $addToSet: '$values.task_id' },
      'task_status_types': {$push: '$values.task_statustype'},
      'task_complexities': {$push: '$values.reported_complexity'},
      'days_reported': {$addToSet: {
        'yearMonthDay': {
           '$dateToString': {
             'format': '%Y-%m-%d', 
             'date': '$date_reported' }
         }}},
         'avrg_complexity': { '$avg': '$values.reported_complexity' },
     }
   }, 
    { $project: {
      _id: 1,
      'users_unique': { $size: '$users_reported' }, 
      'brands_unique': { $size: '$brands_reported' },
      'kbf_tasks': { $size: '$kbf_tasks' },
      'total_time': '$total_time',
      'reported_tasks': '$reported_tasks', 
      'avrg_task_time': '$avrg_task_time', 
      'brands_reported': '$brands_reported',
      'new': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'NUEVO INGRESO']}}}},
      'first_delivery': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'PRIMER ENVIO']}}}},
      'changes': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'CAMBIOS']}}}},
      'rework': {$size: {$filter:{input:'$task_status_types', as: 'type', cond: {$eq:["$$type", 'RETRABAJO']}}}},
      'complexity_1': {$size: {$filter:{input:'$task_complexities', as: 'complexity', cond: {$eq:["$$complexity", 1]}}}},
      'complexity_2': {$size: {$filter:{input:'$task_complexities', as: 'complexity', cond: {$eq:["$$complexity", 2]}}}},
      'complexity_3': {$size: {$filter:{input:'$task_complexities', as: 'complexity', cond: {$eq:["$$complexity", 3]}}}},
      'days_reported': { $size: '$days_reported' },
      'avrg_complexity': '$avrg_complexity',
  },
    },
   {$sort: {
       '_id': -1,
     }
   }
  ];

  module.exports.groupByTask =  [
  
    { '$group': {
      '_id': '$values.task_id',
      'name': { $addToSet: '$values.task_name' },
      'brand': { $addToSet: '$values.reported_brand' },
      'users_reported': { $addToSet: '$values.user_email' },
      'reported_tasks': { '$sum': 1 }, 
      'avrg_task_time': { '$avg': '$values.reported_minutes' }, 
      'total_time': { '$sum': '$values.reported_minutes' },
      'reports': {$push:{ 'yearMonthDay': {'$dateToString': {'format': '%Y-%m-%d', 'date': '$date_reported' }}, 
                          'user_reported': "$values.user_email", 
                          'reported_minutes': "$values.reported_minutes", 
                          'task_status_type': '$values.task_statustype',
                          'task_complexity': '$values.reported_complexity',
                         }
                  },
        }
    }, 
  ]