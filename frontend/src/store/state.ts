let comps_sum = [
    {
        idd: 'layout', title: 'Layouts', type:'layout', children: [
            {idd: '1_col',title: '1 Cols', type:'layout',
                styles:{
                    'min-height': '60px',
                    'margin-left': 0,
                    'margin-right': 0,
                    'margin-top': 0,
                    'margin-bottom': 0,
                    'background-color': 'transparent'
                },
                col_styles: {
                    display: 'flex',
                    'justify-content': 'flex-start',
                    'align-items': 'flex-start',
                    'flex-wrap': 'wrap'
                },
                comp_name: 'Layouts',
                confs: {gutterKey: 0, vgutterKey:0, colCountKey:1},
                cols:[
                    {idd: '1_col_1',title: '2 Cols', type:'col', span: 24, comps:[]}
                ]
            },
            {idd: '2_col',title: '2 Cols', type:'layout',comp_name: 'Layouts',
                styles:{
                    'min-height': '60px',
                    'margin-left': 0,
                    'margin-right': 0,
                    'margin-top': 0,
                    'margin-bottom': 0,
                    'background-color': 'transparent'
                },
                col_styles: {
                    display: 'flex',
                    'justify-content': 'flex-start',
                    'align-items': 'flex-start',
                    'flex-wrap': 'wrap'
                },
                cols:[
                    {idd: '2_col_1',title: '2 Cols', type:'col', span: 12, comps:[]},
                    {idd: '2_col_2',title: '2 Cols', type:'col', span: 12, comps:[]}
                ]
            },
            {idd: '3_col',title: '3 Cols', type:'layout',comp_name: 'Layouts',
                styles:{
                    'min-height': '60px',
                    'margin-left': 0,
                    'margin-right': 0,
                    'margin-top': 0,
                    'margin-bottom': 0,
                    'background-color': 'transparent'
                },
                col_styles: {
                    display: 'flex',
                    'justify-content': 'flex-start',
                    'align-items': 'flex-start',
                    'flex-wrap': 'wrap'
                },
                cols:[
                    {idd: '3_col_1',title: '2 Cols', type:'col', span: 8, comps:[]},
                    {idd: '3_col_2',title: '2 Cols', type:'col', span: 8, comps:[]},
                    {idd: '3_col_3',title: '2 Cols', type:'col', span: 8, comps:[]}
                ]
            },
            {idd: '4_col',title: '4 Cols', type:'layout',comp_name: 'Layouts',
                styles:{
                    'min-height': '60px',
                    'margin-left': 0,
                    'margin-right': 0,
                    'margin-top': 0,
                    'margin-bottom': 0,
                    'background-color': 'transparent'
                },
                col_styles: {
                    display: 'flex',
                    'justify-content': 'flex-start',
                    'align-items': 'flex-start',
                    'flex-wrap': 'wrap'
                },
                col_widths:{
                    
                },
                cols:[
                    {idd: '4_col_1', title: '2 Cols', type:'col', span: 6, comps:[]},
                    {idd: '4_col_2',title: '2 Cols', type:'col', span: 6, comps:[]},
                    {idd: '4_col_3',title: '2 Cols', type:'col', span: 6, comps:[]},
                    {idd: '4_col_4',title: '2 Cols', type:'col', span: 6, comps:[]}
                ]
            }
        ]
    },
    {
        idd: 'basic', title: 'Basic Components', type:'basic', children: [
            {idd: 'basic_1',title: 'Button', type:'button', comp_name: 'LButton',
                styles:{
                }
            },
            {idd: 'basic_2',title: 'Input', type:'input', comp_name: 'LInput', styles:{}},
            {idd: 'basic_3',title: 'Select', type:'select', comp_name: 'ASelect', styles:{}},
            {idd: 'basic_4',title: 'Icon', type:'icon', type_value: 'HomeOutlined', comp_name: 'LIcon', styles:{}},
            {idd: 'basic_5',title: 'Label', type:'label', comp_name: 'LLabel', value: 'test', styles:{}},
        ]
    },
    {
        idd: 'template', title: 'Templates', type:'template', children: [
            {idd: 'template_1',title: 'Form', type:'form', comp_name: 'LForm',
                styles:{
                }
            },
            {idd: 'template_2',title: 'Tabel', type:'tabel', comp_name: 'LTabel',
                styles:{
                },
                columns: [
                    {
                      title: 'Colum1',
                      dataIndex: 'name',
                    },
                    {
                      title: 'Age',
                      dataIndex: 'age',
                    },
                    {
                      title: 'Address',
                      dataIndex: 'address',
                    },
                  ]
            },
            {idd: 'template_3',title: 'Card', type:'card', comp_name: 'LCard',
                styles:{
                    width: '100%',
                },
                list:[]
            }
        ]
    },
    {
        idd: 'chart', title: 'Charts', type:'chart', children: [
            {idd: 'chart_1',title: 'Chart',chart_type: 'line', type:'echart', comp_name: 'LChart',
                styles:{
                    height:'120px',
                    width:'180px'
                }
            },
            {idd: 'chart_2',title: 'Map',chart_type: 'map', type:'echart', comp_name: 'LMap',
                styles:{
                    height:'120px',
                    width:'180px'
                }
            }
        ]
    }
];
let icon_list = {
    'outline': ["StepBackwardOutlined","StepForwardOutlined","FastBackwardOutlined","FastForwardOutlined","ShrinkOutlined","ArrowsAltOutlined","DownOutlined","UpOutlined","LeftOutlined","RightOutlined","CaretUpOutlined","CaretDownOutlined","CaretLeftOutlined","CaretRightOutlined","UpCircleOutlined","DownCircleOutlined","LeftCircleOutlined","RightCircleOutlined","DoubleRightOutlined","DoubleLeftOutlined","VerticalLeftOutlined","VerticalRightOutlined","VerticalAlignTopOutlined","VerticalAlignMiddleOutlined","VerticalAlignBottomOutlined","ForwardOutlined","BackwardOutlined","RollbackOutlined","EnterOutlined","RetweetOutlined","SwapOutlined","SwapLeftOutlined","SwapRightOutlined","ArrowUpOutlined","ArrowDownOutlined","ArrowLeftOutlined","ArrowRightOutlined","PlayCircleOutlined","UpSquareOutlined","DownSquareOutlined","LeftSquareOutlined","RightSquareOutlined","LoginOutlined","LogoutOutlined","MenuFoldOutlined","MenuUnfoldOutlined","BorderBottomOutlined","BorderHorizontalOutlined","BorderInnerOutlined","BorderOuterOutlined","BorderLeftOutlined","BorderRightOutlined","BorderTopOutlined","BorderVerticleOutlined","PicCenterOutlined","PicLeftOutlined","PicRightOutlined","RadiusBottomleftOutlined","RadiusBottomrightOutlined","RadiusUpleftOutlined","RadiusUprightOutlined","FullscreenOutlined","FullscreenExitOutlined","QuestionOutlined","QuestionCircleOutlined","PlusOutlined","PlusCircleOutlined","PauseOutlined","PauseCircleOutlined","MinusOutlined","MinusCircleOutlined","PlusSquareOutlined","MinusSquareOutlined","InfoOutlined","InfoCircleOutlined","ExclamationOutlined","ExclamationCircleOutlined","CloseOutlined","CloseCircleOutlined","CloseSquareOutlined","CheckOutlined","CheckCircleOutlined","CheckSquareOutlined","ClockCircleOutlined","WarningOutlined","IssuesCloseOutlined","StopOutlined","EditOutlined","FormOutlined","CopyOutlined","ScissorOutlined","DeleteOutlined","SnippetsOutlined","DiffOutlined","HighlightOutlined","AlignCenterOutlined","AlignLeftOutlined","AlignRightOutlined","BgColorsOutlined","BoldOutlined","ItalicOutlined","UnderlineOutlined","StrikethroughOutlined","RedoOutlined","UndoOutlined","ZoomInOutlined","ZoomOutOutlined","FontColorsOutlined","FontSizeOutlined","LineHeightOutlined","DashOutlined","SmallDashOutlined","SortAscendingOutlined","SortDescendingOutlined","DragOutlined","OrderedListOutlined","UnorderedListOutlined","RadiusSettingOutlined","ColumnWidthOutlined","ColumnHeightOutlined","AreaChartOutlined","PieChartOutlined","BarChartOutlined","DotChartOutlined","LineChartOutlined","RadarChartOutlined","HeatMapOutlined","FallOutlined","RiseOutlined","StockOutlined","BoxPlotOutlined","FundOutlined","SlidersOutlined","AndroidOutlined","AppleOutlined","WindowsOutlined","IeOutlined","ChromeOutlined","GithubOutlined","AliwangwangOutlined","DingdingOutlined","WeiboSquareOutlined","WeiboCircleOutlined","TaobaoCircleOutlined","Html5Outlined","WeiboOutlined","TwitterOutlined","WechatOutlined","YoutubeOutlined","AlipayCircleOutlined","TaobaoOutlined","SkypeOutlined","QqOutlined","MediumWorkmarkOutlined","GitlabOutlined","MediumOutlined","LinkedinOutlined","GooglePlusOutlined","DropboxOutlined","FacebookOutlined","CodepenOutlined","CodeSandboxOutlined","AmazonOutlined","GoogleOutlined","CodepenCircleOutlined","AlipayOutlined","AntDesignOutlined","AntCloudOutlined","AliyunOutlined","ZhihuOutlined","SlackOutlined","SlackSquareOutlined","BehanceOutlined","BehanceSquareOutlined","DribbbleOutlined","DribbbleSquareOutlined","InstagramOutlined","YuqueOutlined","AlibabaOutlined","YahooOutlined","RedditOutlined","SketchOutlined","AccountBookOutlined","AimOutlined","AlertOutlined","ApartmentOutlined","ApiOutlined","AppstoreAddOutlined","AppstoreOutlined","AudioOutlined","AudioMutedOutlined","AuditOutlined","BankOutlined","BarcodeOutlined","BarsOutlined","BellOutlined","BlockOutlined","BookOutlined","BorderOutlined","BorderlessTableOutlined","BranchesOutlined","BugOutlined","BuildOutlined","BulbOutlined","CalculatorOutlined","CalendarOutlined","CameraOutlined","CarOutlined","CarryOutOutlined","CiCircleOutlined","CiOutlined","ClearOutlined","CloudDownloadOutlined","CloudOutlined","CloudServerOutlined","CloudSyncOutlined","CloudUploadOutlined","ClusterOutlined","CodeOutlined","CoffeeOutlined","CommentOutlined","CompassOutlined","CompressOutlined","ConsoleSqlOutlined","ContactsOutlined","ContainerOutlined","ControlOutlined","CopyrightCircleOutlined","CopyrightOutlined","CreditCardOutlined","CrownOutlined","CustomerServiceOutlined","DashboardOutlined","DatabaseOutlined","DeleteColumnOutlined","DeleteRowOutlined","DeliveredProcedureOutlined","DeploymentUnitOutlined","DesktopOutlined","DingtalkOutlined","DisconnectOutlined","DislikeOutlined","DollarCircleOutlined","DollarOutlined","DownloadOutlined","EllipsisOutlined","EnvironmentOutlined","EuroCircleOutlined","EuroOutlined","ExceptionOutlined","ExpandAltOutlined","ExpandOutlined","ExperimentOutlined","ExportOutlined","EyeOutlined","EyeInvisibleOutlined","FieldBinaryOutlined","FieldNumberOutlined","FieldStringOutlined","FieldTimeOutlined","FileAddOutlined","FileDoneOutlined","FileExcelOutlined","FileExclamationOutlined","FileOutlined","FileGifOutlined","FileImageOutlined","FileJpgOutlined","FileMarkdownOutlined","FilePdfOutlined","FilePptOutlined","FileProtectOutlined","FileSearchOutlined","FileSyncOutlined","FileTextOutlined","FileUnknownOutlined","FileWordOutlined","FileZipOutlined","FilterOutlined","FireOutlined","FlagOutlined","FolderAddOutlined","FolderOutlined","FolderOpenOutlined","FolderViewOutlined","ForkOutlined","FormatPainterOutlined","FrownOutlined","FunctionOutlined","FundProjectionScreenOutlined","FundViewOutlined","FunnelPlotOutlined","GatewayOutlined","GifOutlined","GiftOutlined","GlobalOutlined","GoldOutlined","GroupOutlined","HddOutlined","HeartOutlined","HistoryOutlined","HolderOutlined","HomeOutlined","HourglassOutlined","IdcardOutlined","ImportOutlined","InboxOutlined","InsertRowAboveOutlined","InsertRowBelowOutlined","InsertRowLeftOutlined","InsertRowRightOutlined","InsuranceOutlined","InteractionOutlined","KeyOutlined","LaptopOutlined","LayoutOutlined","LikeOutlined","LineOutlined","LinkOutlined","Loading3QuartersOutlined","LoadingOutlined","LockOutlined","MacCommandOutlined","MailOutlined","ManOutlined","MedicineBoxOutlined","MehOutlined","MenuOutlined","MergeCellsOutlined","MessageOutlined","MobileOutlined","MoneyCollectOutlined","MonitorOutlined","MoreOutlined","NodeCollapseOutlined","NodeExpandOutlined","NodeIndexOutlined","NotificationOutlined","NumberOutlined","OneToOneOutlined","PaperClipOutlined","PartitionOutlined","PayCircleOutlined","PercentageOutlined","PhoneOutlined","PictureOutlined","PlaySquareOutlined","PoundCircleOutlined","PoundOutlined","PoweroffOutlined","PrinterOutlined","ProfileOutlined","ProjectOutlined","PropertySafetyOutlined","PullRequestOutlined","PushpinOutlined","QrcodeOutlined","ReadOutlined","ReconciliationOutlined","RedEnvelopeOutlined","ReloadOutlined","RestOutlined","RobotOutlined","RocketOutlined","RotateLeftOutlined","RotateRightOutlined","SafetyCertificateOutlined","SafetyOutlined","SaveOutlined","ScanOutlined","ScheduleOutlined","SearchOutlined","SecurityScanOutlined","SelectOutlined","SendOutlined","SettingOutlined","ShakeOutlined","ShareAltOutlined","ShopOutlined","ShoppingCartOutlined","ShoppingOutlined","SisternodeOutlined","SkinOutlined","SmileOutlined","SolutionOutlined","SoundOutlined","SplitCellsOutlined","StarOutlined","SubnodeOutlined","SwitcherOutlined","SyncOutlined","TableOutlined","TabletOutlined","TagOutlined","TagsOutlined","TeamOutlined","ThunderboltOutlined","ToTopOutlined","ToolOutlined","TrademarkCircleOutlined","TrademarkOutlined","TransactionOutlined","TranslationOutlined","TrophyOutlined","UngroupOutlined","UnlockOutlined","UploadOutlined","UsbOutlined","UserAddOutlined","UserDeleteOutlined","UserOutlined","UserSwitchOutlined","UsergroupAddOutlined","UsergroupDeleteOutlined","VerifiedOutlined","VideoCameraAddOutlined","VideoCameraOutlined","WalletOutlined","WhatsAppOutlined","WifiOutlined","WomanOutlined"],
    'fill': ["StepBackwardFilled","StepForwardFilled","FastBackwardFilled","FastForwardFilled","CaretUpFilled","CaretDownFilled","CaretLeftFilled","CaretRightFilled","UpCircleFilled","DownCircleFilled","LeftCircleFilled","RightCircleFilled","ForwardFilled","BackwardFilled","PlayCircleFilled","UpSquareFilled","DownSquareFilled","LeftSquareFilled","RightSquareFilled","QuestionCircleFilled","PlusCircleFilled","PauseCircleFilled","MinusCircleFilled","PlusSquareFilled","MinusSquareFilled","InfoCircleFilled","ExclamationCircleFilled","CloseCircleFilled","CloseSquareFilled","CheckCircleFilled","CheckSquareFilled","ClockCircleFilled","WarningFilled","StopFilled","EditFilled","CopyFilled","DeleteFilled","SnippetsFilled","DiffFilled","HighlightFilled","PieChartFilled","BoxPlotFilled","FundFilled","SlidersFilled","AndroidFilled","AppleFilled","WindowsFilled","ChromeFilled","GithubFilled","AliwangwangFilled","WeiboSquareFilled","WeiboCircleFilled","TaobaoCircleFilled","Html5Filled","WechatFilled","YoutubeFilled","AlipayCircleFilled","SkypeFilled","GitlabFilled","LinkedinFilled","FacebookFilled","CodeSandboxCircleFilled","CodepenCircleFilled","SlackSquareFilled","BehanceSquareFilled","DribbbleSquareFilled","InstagramFilled","YuqueFilled","YahooFilled","AccountBookFilled","AlertFilled","AlipaySquareFilled","AmazonCircleFilled","AmazonSquareFilled","ApiFilled","AppstoreFilled","AudioFilled","BankFilled","BehanceCircleFilled","BellFilled","BookFilled","BugFilled","BuildFilled","BulbFilled","CalculatorFilled","CalendarFilled","CameraFilled","CarFilled","CarryOutFilled","CiCircleFilled","CloudFilled","CodeFilled","CodeSandboxSquareFilled","CodepenSquareFilled","CompassFilled","ContactsFilled","ContainerFilled","ControlFilled","CopyrightCircleFilled","CreditCardFilled","CrownFilled","CustomerServiceFilled","DashboardFilled","DatabaseFilled","DingtalkCircleFilled","DingtalkSquareFilled","DislikeFilled","DollarCircleFilled","DribbbleCircleFilled","DropboxCircleFilled","DropboxSquareFilled","EnvironmentFilled","EuroCircleFilled","ExperimentFilled","EyeFilled","EyeInvisibleFilled","FileAddFilled","FileExcelFilled","FileExclamationFilled","FileFilled","FileImageFilled","FileMarkdownFilled","FilePdfFilled","FilePptFilled","FileTextFilled","FileUnknownFilled","FileWordFilled","FileZipFilled","FilterFilled","FireFilled","FlagFilled","FolderAddFilled","FolderFilled","FolderOpenFilled","FormatPainterFilled","FrownFilled","FunnelPlotFilled","GiftFilled","GoldFilled","GoldenFilled","GoogleCircleFilled","GooglePlusCircleFilled","GooglePlusSquareFilled","GoogleSquareFilled","HddFilled","HeartFilled","HomeFilled","HourglassFilled","IdcardFilled","IeCircleFilled","IeSquareFilled","InsuranceFilled","InteractionFilled","LayoutFilled","LikeFilled","LockFilled","MacCommandFilled","MailFilled","MedicineBoxFilled","MediumCircleFilled","MediumSquareFilled","MehFilled","MessageFilled","MobileFilled","MoneyCollectFilled","NotificationFilled","PayCircleFilled","PhoneFilled","PictureFilled","PlaySquareFilled","PoundCircleFilled","PrinterFilled","ProfileFilled","ProjectFilled","PropertySafetyFilled","PushpinFilled","QqCircleFilled","QqSquareFilled","ReadFilled","ReconciliationFilled","RedEnvelopeFilled","RedditCircleFilled","RedditSquareFilled","RestFilled","RobotFilled","RocketFilled","SafetyCertificateFilled","SaveFilled","ScheduleFilled","SecurityScanFilled","SettingFilled","ShopFilled","ShoppingFilled","SignalFilled","SketchCircleFilled","SketchSquareFilled","SkinFilled","SlackCircleFilled","SmileFilled","SoundFilled","StarFilled","SwitcherFilled","TabletFilled","TagFilled","TagsFilled","TaobaoSquareFilled","ThunderboltFilled","ToolFilled","TrademarkCircleFilled","TrophyFilled","TwitterCircleFilled","TwitterSquareFilled","UnlockFilled","UsbFilled","VideoCameraFilled","WalletFilled","ZhihuCircleFilled","ZhihuSquareFilled"],
    'circle-two': ["UpCircleTwoTone","DownCircleTwoTone","LeftCircleTwoTone","RightCircleTwoTone","PlayCircleTwoTone","UpSquareTwoTone","DownSquareTwoTone","LeftSquareTwoTone","RightSquareTwoTone","QuestionCircleTwoTone","PlusCircleTwoTone","PauseCircleTwoTone","MinusCircleTwoTone","PlusSquareTwoTone","MinusSquareTwoTone","InfoCircleTwoTone","ExclamationCircleTwoTone","CloseCircleTwoTone","CloseSquareTwoTone","CheckCircleTwoTone","CheckSquareTwoTone","ClockCircleTwoTone","WarningTwoTone","StopTwoTone","EditTwoTone","CopyTwoTone","DeleteTwoTone","SnippetsTwoTone","DiffTwoTone","HighlightTwoTone","PieChartTwoTone","BoxPlotTwoTone","FundTwoTone","SlidersTwoTone","Html5TwoTone","AccountBookTwoTone","AlertTwoTone","ApiTwoTone","AppstoreTwoTone","AudioTwoTone","BankTwoTone","BellTwoTone","BookTwoTone","BugTwoTone","BuildTwoTone","BulbTwoTone","CalculatorTwoTone","CalendarTwoTone","CameraTwoTone","CarTwoTone","CarryOutTwoTone","CiCircleTwoTone","CiTwoTone","CloudTwoTone","CodeTwoTone","CompassTwoTone","ContactsTwoTone","ContainerTwoTone","ControlTwoTone","CopyrightCircleTwoTone","CopyrightTwoTone","CreditCardTwoTone","CrownTwoTone","CustomerServiceTwoTone","DashboardTwoTone","DatabaseTwoTone","DislikeTwoTone","DollarCircleTwoTone","DollarTwoTone","EnvironmentTwoTone","EuroCircleTwoTone","EuroTwoTone","ExperimentTwoTone","EyeTwoTone","EyeInvisibleTwoTone","FileAddTwoTone","FileExcelTwoTone","FileExclamationTwoTone","FileTwoTone","FileImageTwoTone","FileMarkdownTwoTone","FilePdfTwoTone","FilePptTwoTone","FileTextTwoTone","FileUnknownTwoTone","FileWordTwoTone","FileZipTwoTone","FilterTwoTone","FireTwoTone","FlagTwoTone","FolderAddTwoTone","FolderTwoTone","FolderOpenTwoTone","FrownTwoTone","FunnelPlotTwoTone","GiftTwoTone","GoldTwoTone","HddTwoTone","HeartTwoTone","HomeTwoTone","HourglassTwoTone","IdcardTwoTone","InsuranceTwoTone","InteractionTwoTone","LayoutTwoTone","LikeTwoTone","LockTwoTone","MailTwoTone","MedicineBoxTwoTone","MehTwoTone","MessageTwoTone","MobileTwoTone","MoneyCollectTwoTone","NotificationTwoTone","PhoneTwoTone","PictureTwoTone","PlaySquareTwoTone","PoundCircleTwoTone","PrinterTwoTone","ProfileTwoTone","ProjectTwoTone","PropertySafetyTwoTone","PushpinTwoTone","ReconciliationTwoTone","RedEnvelopeTwoTone","RestTwoTone","RocketTwoTone","SafetyCertificateTwoTone","SaveTwoTone","ScheduleTwoTone","SecurityScanTwoTone","SettingTwoTone","ShopTwoTone","ShoppingTwoTone","SkinTwoTone","SmileTwoTone","SoundTwoTone","StarTwoTone","SwitcherTwoTone","TabletTwoTone","TagTwoTone","TagsTwoTone","ThunderboltTwoTone","ToolTwoTone","TrademarkCircleTwoTone","TrophyTwoTone","UnlockTwoTone","UsbTwoTone","VideoCameraTwoTone","WalletTwoTone"]
};
export default {
    comps_sum,
    icon_list,
    list: [] as any,
    compType: 'layout',
    drawer_conf: {
        visible: false
    } as any
}
