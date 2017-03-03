

package com.linewell.core.sync;
/**
 *功能说明：网闸工作
 *<P></P>
 *@author chh
 *@since 2012
 *
 */
public class NetBrakeFactory {

	public static  INetBrakeGenerator getInstance(){
		return new OracleGenerator();
	}
}

