const getWasteInfo = (label) => {
    const map = {
        'bottle': { category: 'recyclable', material: 'plastic/glass', is_hazardous: false, is_recyclable: true },
        'cup': { category: 'recyclable', material: 'paper/plastic', is_hazardous: false, is_recyclable: true },
        'wine glass': { category: 'recyclable', material: 'glass', is_hazardous: false, is_recyclable: true },
        'apple': { category: 'biodegradable', material: 'organic', is_hazardous: false, is_recyclable: false },
        'banana': { category: 'biodegradable', material: 'organic', is_hazardous: false, is_recyclable: false },
        'orange': { category: 'biodegradable', material: 'organic', is_hazardous: false, is_recyclable: false },
        'sandwich': { category: 'biodegradable', material: 'organic', is_hazardous: false, is_recyclable: false },
        'broccoli': { category: 'biodegradable', material: 'organic', is_hazardous: false, is_recyclable: false },
        'carrot': { category: 'biodegradable', material: 'organic', is_hazardous: false, is_recyclable: false },
        'hot dog': { category: 'biodegradable', material: 'organic', is_hazardous: false, is_recyclable: false },
        'pizza': { category: 'biodegradable', material: 'organic', is_hazardous: false, is_recyclable: false },
        'donut': { category: 'biodegradable', material: 'organic', is_hazardous: false, is_recyclable: false },
        'cake': { category: 'biodegradable', material: 'organic', is_hazardous: false, is_recyclable: false },
        'laptop': { category: 'hazardous', material: 'electronic', is_hazardous: true, is_recyclable: true },
        'cell phone': { category: 'hazardous', material: 'electronic', is_hazardous: true, is_recyclable: true },
        'mouse': { category: 'hazardous', material: 'electronic', is_hazardous: true, is_recyclable: true },
        'keyboard': { category: 'hazardous', material: 'electronic', is_hazardous: true, is_recyclable: true },
        'tv': { category: 'hazardous', material: 'electronic', is_hazardous: true, is_recyclable: true },
        'microwave': { category: 'hazardous', material: 'electronic', is_hazardous: true, is_recyclable: true },
        'oven': { category: 'hazardous', material: 'electronic', is_hazardous: true, is_recyclable: true },
        'toaster': { category: 'hazardous', material: 'electronic', is_hazardous: true, is_recyclable: true },
        'refrigerator': { category: 'hazardous', material: 'electronic', is_hazardous: true, is_recyclable: true },
        'book': { category: 'recyclable', material: 'paper', is_hazardous: false, is_recyclable: true },
        'clock': { category: 'hazardous', material: 'electronic/mixed', is_hazardous: true, is_recyclable: true },
        'vase': { category: 'recyclable', material: 'glass/ceramic', is_hazardous: false, is_recyclable: true },
        'scissors': { category: 'recyclable', material: 'metal', is_hazardous: false, is_recyclable: true },
        'teddy bear': { category: 'unknown', material: 'fabric', is_hazardous: false, is_recyclable: false },
        'toothbrush': { category: 'recyclable', material: 'plastic', is_hazardous: false, is_recyclable: true },
    };

    return map[label.toLowerCase()] || { category: 'unknown', material: 'mixed', is_hazardous: false, is_recyclable: false };
};

export default getWasteInfo;
