// Seed script.
// Populates lookup tables with default values.

const prisma = require('../src/config/db');

async function main() {
    // Application statuses
    const statuses = [
        'Wishlist',
        'Applied',
        'Phone Screen',
        'Interview',
        'Offer',
        'Rejected',
        'Withdrawn'
    ];

    for (const statusName of statuses) {
        await prisma.applicationStatus.upsert({
            where: { statusName },
            update: {},
            create: { statusName }
        });
    }
    console.log('✅ Application statuses seeded');

    // Work types
    const workTypes = ['Remote', 'Hybrid', 'Onsite'];

    for (const workTypeName of workTypes) {
        await prisma.workType.upsert({
            where: { workTypeName },
            update: {},
            create: { workTypeName }
        });
    }
    console.log('✅ Work types seeded');

    // US States
    const states = [
        { stateName: 'Alabama', stateCode: 'AL' },
        { stateName: 'Alaska', stateCode: 'AK' },
        { stateName: 'Arizona', stateCode: 'AZ' },
        { stateName: 'Arkansas', stateCode: 'AR' },
        { stateName: 'California', stateCode: 'CA' },
        { stateName: 'Colorado', stateCode: 'CO' },
        { stateName: 'Connecticut', stateCode: 'CT' },
        { stateName: 'Delaware', stateCode: 'DE' },
        { stateName: 'Florida', stateCode: 'FL' },
        { stateName: 'Georgia', stateCode: 'GA' },
        { stateName: 'Hawaii', stateCode: 'HI' },
        { stateName: 'Idaho', stateCode: 'ID' },
        { stateName: 'Illinois', stateCode: 'IL' },
        { stateName: 'Indiana', stateCode: 'IN' },
        { stateName: 'Iowa', stateCode: 'IA' },
        { stateName: 'Kansas', stateCode: 'KS' },
        { stateName: 'Kentucky', stateCode: 'KY' },
        { stateName: 'Louisiana', stateCode: 'LA' },
        { stateName: 'Maine', stateCode: 'ME' },
        { stateName: 'Maryland', stateCode: 'MD' },
        { stateName: 'Massachusetts', stateCode: 'MA' },
        { stateName: 'Michigan', stateCode: 'MI' },
        { stateName: 'Minnesota', stateCode: 'MN' },
        { stateName: 'Mississippi', stateCode: 'MS' },
        { stateName: 'Missouri', stateCode: 'MO' },
        { stateName: 'Montana', stateCode: 'MT' },
        { stateName: 'Nebraska', stateCode: 'NE' },
        { stateName: 'Nevada', stateCode: 'NV' },
        { stateName: 'New Hampshire', stateCode: 'NH' },
        { stateName: 'New Jersey', stateCode: 'NJ' },
        { stateName: 'New Mexico', stateCode: 'NM' },
        { stateName: 'New York', stateCode: 'NY' },
        { stateName: 'North Carolina', stateCode: 'NC' },
        { stateName: 'North Dakota', stateCode: 'ND' },
        { stateName: 'Ohio', stateCode: 'OH' },
        { stateName: 'Oklahoma', stateCode: 'OK' },
        { stateName: 'Oregon', stateCode: 'OR' },
        { stateName: 'Pennsylvania', stateCode: 'PA' },
        { stateName: 'Rhode Island', stateCode: 'RI' },
        { stateName: 'South Carolina', stateCode: 'SC' },
        { stateName: 'South Dakota', stateCode: 'SD' },
        { stateName: 'Tennessee', stateCode: 'TN' },
        { stateName: 'Texas', stateCode: 'TX' },
        { stateName: 'Utah', stateCode: 'UT' },
        { stateName: 'Vermont', stateCode: 'VT' },
        { stateName: 'Virginia', stateCode: 'VA' },
        { stateName: 'Washington', stateCode: 'WA' },
        { stateName: 'West Virginia', stateCode: 'WV' },
        { stateName: 'Wisconsin', stateCode: 'WI' },
        { stateName: 'Wyoming', stateCode: 'WY' },
        { stateName: 'District of Columbia', stateCode: 'DC' }
    ];

    for (const state of states) {
        await prisma.state.upsert({
            where: { stateCode: state.stateCode },
            update: {},
            create: state
        });
    }
    console.log('✅ US states seeded');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });