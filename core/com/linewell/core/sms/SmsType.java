package com.linewell.core.sms;
/**
 * <p>
 *    短信类型
 * </p>
 *
 * @author 邱聪勇   
 * @email qcongyong@linewell.com
 * @date Nov 23, 2012
 * @version 1.0  
 */
public class SmsType {
    
    // 外网申报生成的短信 (1到10)
    public static final int WAI_WANG_TI_JIAO = 1;      // 外网提交（预审人员）
    
    // 办理过程产生的短信 (11到50)
    public static final int YU_SHEN_TONG_GUO_OUT = 10;      // 预审通过（申请者）
    public static final int YU_SHEN_TONGGUO_IN_01 = 11;     // 预审通过（受理人员）
    public static final int YU_SHEN_BU_JIAN_OUT = 12;       // 预审补件（申请者）  
    public static final int YU_SHEN_BU_TONG_GUO_OUT = 13;   // 预审不通过（申请者）
    public static final int SHOU_LI_OUT = 14;               // 受理（申请者）
    public static final int SHOU_LI_IN_01 = 15;             // 受理（受理人员）
    public static final int BU_JIAN_OUT = 16;               // 补件（申请者）
    public static final int BU_JIAN_IN_02 = 17;             // 补件（监察人员）
    public static final int BU_SHOU_LI_OUT = 18;            // 不受理（申请者）
    public static final int BU_SHOU_LI_IN_02 = 19;          // 不受理（监察人员）
    public static final int TE_SHU_HUAN_JIE_OUT = 20;       // 特殊环节（申请者）
    public static final int TI_JIAO_IN_01 = 21;             // 提交（经办人员）
    public static final int TUI_JIAN_OUT = 22;              // 退件（申请者）
    public static final int TUI_JIAN_IN_02 = 23;            // 退件（监察人员）
    public static final int BAN_JIE_OUT = 24;               // 办结（申请者）
    public static final int TUI_HUI_OUT = 25;               // 退回（申请者）
    public static final int TE_SHU_HUAN_JIE_END_OUT = 26;   // 特殊环节结束(申请者)
    public static final int MEN_HU_SHEN_BAO_TONG_ZHI = 27;   // 门户申报通知(经办人员)
    
    // 办件监察产生的短信 (61到70)
    public static final int CHAO_QI_IN_01 = 61;             // 超期（经办人员）
    public static final int CHAO_QI_IN_02 = 62;             // 超期（监察人员）
    public static final int CUI_BAN_IN_01 = 63;             // 催办（经办人员）
    public static final int LIN_JIN_YU_JING_IN_01 = 64;     // 临界预警（经办人员）
    
    // 绿色通道涉及的短信 (71到80)
    public static final int LSTD_SHOU_LI_TONG_ZHI = 71;     // 绿色通道受理通知

    // 联动涉及的短信 (81到90)
    public static final int SHI_JI_TI_JIAO = 81;            //市级提交
    public static final int SHI_JI_BU_JIAN_WAN_CHENG = 82;  //市级提交(补件完成)
    
    // 联合审批涉及的短信 (90到100)
    public static final int XIE_BAN_BAN_JIE_TONG_ZHI = 91;  //协办办结通知
    public static final int LIAN_BAN_TONG_ZHI = 92;         //发起联办通知
    public static final int LIAN_BAN_XIAO_XI = 93;          //联办消息
}
