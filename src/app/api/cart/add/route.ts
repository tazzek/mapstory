import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('Received Add to Cart request:', body);

        // Mock WooCommerce integration
        // Here we would normally send data to WooCommerce API

        return NextResponse.json({ success: true, message: 'Added to cart successfully' });
    } catch (error) {
        console.error('Error in add to cart:', error);
        return NextResponse.json({ success: false, message: 'Failed to add to cart' }, { status: 500 });
    }
}
